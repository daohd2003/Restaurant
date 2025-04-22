using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using restaurantWebAPI.DTOs;
using restaurantWebAPI.Services;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace restaurantWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles ="Customer")]
    public class UserController : ControllerBase
    {

        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        // GET: api/<UserController>
        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            if (string.IsNullOrEmpty(email))
                return Unauthorized("Email not found in token");

            var user = await _userService.GetProfileAsync(email);
            if (user == null)
                return NotFound("User not found");

            return Ok(user);
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<UserController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<UserController>/5
        [HttpPut("profile")]
        public async Task<IActionResult> UpdateProfile(UserDto updatedUser)
        {
            var emailFromToken = User.FindFirstValue(ClaimTypes.Email);
            var currentProfile = await _userService.GetProfileAsync(emailFromToken);

            if (currentProfile == null || currentProfile.Id != updatedUser.Id)
                return BadRequest("Invalid user");

            // Không cho cập nhật Email - override lại email gốc
            updatedUser.Id = currentProfile.Id;
            updatedUser.Email = currentProfile.Email;

            try
            {
                await _userService.UpdateUserAsync(updatedUser);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error updating profile: " + ex.Message);
            }
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
