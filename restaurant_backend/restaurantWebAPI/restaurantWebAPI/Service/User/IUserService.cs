using restaurantWebAPI.DTOs;
using restaurantWebAPI.Models;

namespace restaurantWebAPI.Services
{
    public interface IUserService
    {
        Task<UserDto?> GetProfileAsync(string email);
        Task UpdateUserAsync(UserDto user);

        Task<AuthResponse> LoginWithRefreshTokenAsync(LoginRequestDto dto);
        Task<AuthResponse> RegisterAsync(RegisterRequestDto dto);
        Task<AuthResponse> RefreshTokenPairAsync(RefreshTokenRequest request);
        Task RevokeTokensAsync(int userId);
    }
}
