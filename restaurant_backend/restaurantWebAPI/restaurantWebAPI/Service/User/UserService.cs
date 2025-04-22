using Microsoft.EntityFrameworkCore;
using restaurantWebAPI.Data;
using restaurantWebAPI.DTOs;
using BCrypt.Net;
using restaurantWebAPI.Models;

namespace restaurantWebAPI.Services
{
    public class UserService : IUserService
    {
        private readonly RestaurantDbContext _dbContext;

        private readonly JwtService _jwtService;

        public UserService(RestaurantDbContext dbContext, JwtService jwtService)
        {
            _dbContext = dbContext;
            _jwtService = jwtService;
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

        public async Task<string> LoginAsync(LoginRequestDto dto)
        {
            var user = await _dbContext.Users
                .FirstOrDefaultAsync(u => u.Email == dto.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                throw new UnauthorizedAccessException("Invalid email or password");

            return _jwtService.GenerateToken(user);
        }

        public async Task<string> RegisterAsync(RegisterRequestDto dto)
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
                return _jwtService.GenerateToken(userEntity);
            }
            catch (Exception ex)
            {
                // Ghi thông tin lỗi chi tiết vào log để dễ dàng theo dõi
                Console.WriteLine($"Error: {ex.Message}");
                Console.WriteLine($"Inner Exception: {ex.InnerException?.Message}");
                Console.WriteLine($"Stack Trace: {ex.StackTrace}");
                throw new Exception("Error saving user", ex);
            }
        }

        public async Task UpdateUserAsync(UserDto userDto)
        {
            var user = await _dbContext.Users.FindAsync(userDto.Id);
            if (user == null)
                throw new Exception("User not found");

            user.FullName = userDto.FullName;
            user.Phone = userDto.Phone;
            user.Address = userDto.Address;
            user.AvatarUrl = userDto.AvatarUrl;

            _dbContext.Users.Update(user);

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                // Log lỗi nếu SaveChangesAsync không thành công
                Console.WriteLine("Error during SaveChangesAsync: " + ex.Message);
                throw;
            }
        }
    }
}
