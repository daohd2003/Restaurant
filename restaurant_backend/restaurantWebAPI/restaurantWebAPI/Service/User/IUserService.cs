using restaurantWebAPI.DTOs;
using restaurantWebAPI.Models;

namespace restaurantWebAPI.Services
{
    public interface IUserService
    {
        Task<string> RegisterAsync(RegisterRequestDto dto);
        Task<string> LoginAsync(LoginRequestDto dto);
        Task<UserDto?> GetProfileAsync(string email);
        Task UpdateUserAsync(UserDto user);
    }
}
