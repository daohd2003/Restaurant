using Microsoft.EntityFrameworkCore;
using restaurantWebAPI.Data;
using restaurantWebAPI.DTOs;
using BCrypt.Net;
using restaurantWebAPI.Models;
using restaurantWebAPI.Controllers;
using CloudinaryDotNet.Actions;
using CloudinaryDotNet;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace restaurantWebAPI.Services
{
    public class UserService : IUserService
    {
        private readonly RestaurantDbContext _dbContext;

        private readonly JwtService _jwtService;

        private readonly IAzureBlobStorageService _blobStorageService;

        private readonly ILogger<UserService> _logger;

        private readonly Cloudinary _cloudinary;

        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserService(RestaurantDbContext dbContext, JwtService jwtService, IAzureBlobStorageService azureBlobStorageService, ILogger<UserService> logger, Cloudinary cloudinary, IHttpContextAccessor httpContextAccessor)
        {
            _dbContext = dbContext;
            _jwtService = jwtService;
            _blobStorageService = azureBlobStorageService;
            _logger = logger;
            _cloudinary = cloudinary;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<UserDto?> GetProfileAsync(string email)
        {
            var user = await _dbContext.Users
                .Where(u => u.Email == email)
                .Select(u => new UserDto
                {
                    Id = u.Id,
                    FullName = u.FullName,
                    Email = u.Email,
                    Phone = u.Phone,
                    Address = u.Address,
                    AvatarUrl = u.AvatarUrl
                })
                .FirstOrDefaultAsync();

            return user;
        }

        public async Task<AuthResponse> LoginWithRefreshTokenAsync(LoginRequestDto dto)
        {
            var user = await _dbContext.Users
                .FirstOrDefaultAsync(u => u.Email == dto.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                throw new UnauthorizedAccessException("Invalid email or password");

            // Tạo tokens
            var accessToken = _jwtService.GenerateAccessToken(user);
            var (refreshToken, hashedToken) = _jwtService.GenerateRefreshToken();

            var ipAddress = _httpContextAccessor.HttpContext?.Connection?.RemoteIpAddress?.ToString() ?? "Unknown";

            // Lưu refresh token vào DB
            await _dbContext.UserRefreshTokens.AddAsync(new UserRefreshToken
            {
                UserId = user.Id,
                Token = hashedToken,
                ExpiryDate = DateTime.UtcNow.AddDays(7),
                DeviceId = dto.DeviceId,
                IpAddress = ipAddress
            });
            await _dbContext.SaveChangesAsync();

            return new AuthResponse
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
                User = new UserDto
                {
                    Id = user.Id,
                    Email = user.Email,
                    FullName = user.FullName,
                    Role = user.Role,
                    Phone = user.Phone,
                    Address = user.Address,
                    AvatarUrl = user.AvatarUrl
                }
            };
        }

        public async Task<AuthResponse> RefreshTokenPairAsync(RefreshTokenRequest request)
        {
            // Xác thực token hết hạn
            var principal = _jwtService.GetPrincipalFromExpiredToken(request.AccessToken);
            var userId = int.Parse(principal.FindFirstValue(ClaimTypes.NameIdentifier));

            // Kiểm tra refresh token trong DB
            var storedToken = await _dbContext.UserRefreshTokens
                .FirstOrDefaultAsync(t => t.UserId == userId &&
                                      t.ExpiryDate > DateTime.UtcNow);

            if (storedToken == null ||
                !_jwtService.ValidateRefreshToken(request.RefreshToken, storedToken.Token))
                throw new SecurityTokenException("Invalid refresh token");

            // Tạo token mới
            var user = await _dbContext.Users.FindAsync(userId);
            var newAccessToken = _jwtService.GenerateAccessToken(user);
            var (newRefreshToken, newHashedToken) = _jwtService.GenerateRefreshToken();

            // Cập nhật DB
            storedToken.Token = newHashedToken;
            storedToken.ExpiryDate = DateTime.UtcNow.AddDays(7);
            await _dbContext.SaveChangesAsync();

            return new AuthResponse
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken
            };
        }

        public async Task RevokeTokensAsync(int userId)
        {
            var tokens = await _dbContext.UserRefreshTokens
                .Where(t => t.UserId == userId)
                .ToListAsync();

            _dbContext.UserRefreshTokens.RemoveRange(tokens);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<AuthResponse> RegisterAsync(RegisterRequestDto dto)
        {
            if (string.IsNullOrEmpty(dto.Email) || string.IsNullOrEmpty(dto.Password))
            {
                throw new ArgumentException("Email and password are required.");
            }

            var user = await _dbContext.Users
                .FirstOrDefaultAsync(u => u.Email == dto.Email);

            if (user != null)
            {
                throw new InvalidOperationException("Email already exists.");
            }

            var passwordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

            var userEntity = new User
            {
                FullName = dto.FullName,
                Email = dto.Email,
                PasswordHash = passwordHash,
            };

            try
            {
                _dbContext.Users.Add(userEntity);
                await _dbContext.SaveChangesAsync();

                var accessToken = _jwtService.GenerateAccessToken(userEntity);
                var (refreshToken, hashedToken) = _jwtService.GenerateRefreshToken();

                await _dbContext.UserRefreshTokens.AddAsync(new UserRefreshToken
                {
                    UserId = userEntity.Id,
                    Token = hashedToken,
                    ExpiryDate = DateTime.UtcNow.AddDays(7),
                    DeviceId = "Web-Registration", // Hoặc từ request nếu có
                    IpAddress = _httpContextAccessor.HttpContext?.Connection?.RemoteIpAddress?.ToString()
                });
                await _dbContext.SaveChangesAsync();

                // 7. Return response
                return new AuthResponse
                {
                    AccessToken = accessToken,
                    RefreshToken = refreshToken,
                    User = new UserDto
                    {
                        Id = userEntity.Id,
                        Email = userEntity.Email,
                        FullName = userEntity.FullName,
                        Role = userEntity.Role
                    }
                };
            }
            catch (DbUpdateException ex)
            {
                _logger.LogError(ex, "Database error while registering user");
                throw new Exception("Could not complete registration. Please try again.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error during registration");
                throw;
            }
        }

        /*public async Task UpdateUserAsync(UserDto userDto)
        {
            var user = await _dbContext.Users.FindAsync(userDto.Id);
            if (user == null)
                throw new Exception("User not found");

            // Cập nhật thông tin cơ bản
            user.FullName = userDto.FullName;
            user.Phone = userDto.Phone;
            user.Address = userDto.Address;

            // Xử lý upload ảnh nếu có file mới
            if (userDto.AvatarFile != null && userDto.AvatarFile.Length > 0)
            {
                // Validate file
                if (userDto.AvatarFile.Length > 5 * 1024 * 1024) // 5MB
                    throw new Exception("File size exceeds 5MB limit");

                var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };
                var extension = Path.GetExtension(userDto.AvatarFile.FileName).ToLowerInvariant();
                if (!allowedExtensions.Contains(extension))
                    throw new Exception("Invalid file type. Only images are allowed");

                // Upload ảnh mới lên Azure
                var newAvatarUrl = await _blobStorageService.UploadFileAsync(
                    userDto.AvatarFile,
                    "user-avatars");

                // Xóa ảnh cũ nếu tồn tại
                if (!string.IsNullOrEmpty(user.AvatarUrl))
                {
                    try
                    {
                        await _blobStorageService.DeleteFileAsync(
                            user.AvatarUrl,
                            "user-avatars");
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Failed to delete old avatar");
                        // Không throw để tiếp tục cập nhật ảnh mới
                    }
                }

                user.AvatarUrl = newAvatarUrl;
            }
            else if (!string.IsNullOrEmpty(userDto.AvatarUrl))
            {
                // Giữ nguyên avatar nếu chỉ có URL mà không có file
                user.AvatarUrl = userDto.AvatarUrl;
            }

            _dbContext.Users.Update(user);

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                _logger.LogError(ex, "Concurrency error updating user");
                throw new Exception("The user was modified by another process");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving user changes");
                throw;
            }
        }*/

        public async Task UpdateUserAsync(UserDto userDto)
        {
            var user = await _dbContext.Users.FindAsync(userDto.Id);
            if (user == null)
                throw new Exception("User not found");

            // Cập nhật thông tin cơ bản
            user.FullName = userDto.FullName;
            user.Phone = userDto.Phone;
            user.Address = userDto.Address;

            // Xử lý upload ảnh nếu có file mới
            if (userDto.AvatarFile != null && userDto.AvatarFile.Length > 0)
            {
                // Validate file (giữ nguyên từ code cũ)
                if (userDto.AvatarFile.Length > 5 * 1024 * 1024)
                    throw new Exception("File size exceeds 5MB limit");

                var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };
                var extension = Path.GetExtension(userDto.AvatarFile.FileName).ToLowerInvariant();
                if (!allowedExtensions.Contains(extension))
                    throw new Exception("Invalid file type. Only images are allowed");

                // Tạo publicId duy nhất cho mỗi user (ví dụ: "user_avatars/user_{id}")
                var publicId = $"user_avatars/user_{userDto.Id}";

                // Upload ảnh lên Cloudinary
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(userDto.AvatarFile.FileName, userDto.AvatarFile.OpenReadStream()),
                    PublicId = publicId,
                    Overwrite = true,  // Ghi đè nếu ảnh cũ tồn tại
                    Transformation = new Transformation()
                        .Width(200).Height(200).Crop("fill")  // Tự động resize và crop ảnh
                };

                var uploadResult = await _cloudinary.UploadAsync(uploadParams);

                if (uploadResult.Error != null)
                {
                    _logger.LogError(uploadResult.Error.Message, "Cloudinary upload failed");
                    throw new Exception("Failed to upload avatar");
                }

                // Xóa ảnh cũ (nếu cần) - Cloudinary tự ghi đè nếu dùng cùng PublicId
                user.AvatarUrl = uploadResult.SecureUrl.ToString();  // Lấy URL an toàn (HTTPS)
            }
            else if (!string.IsNullOrEmpty(userDto.AvatarUrl))
            {
                // Giữ nguyên avatar nếu không có file mới
                user.AvatarUrl = userDto.AvatarUrl;
            }

            // Lưu vào database
            await _dbContext.SaveChangesAsync();
        }
    }
}
