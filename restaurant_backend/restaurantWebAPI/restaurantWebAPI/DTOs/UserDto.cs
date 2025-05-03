namespace restaurantWebAPI.DTOs
{
    public class UserDto
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string? Phone { get; set; }
        public string? Address { get; set; }
        public string? AvatarUrl { get; set; }
        public string Role { get; set; } = "Customer";

        [Newtonsoft.Json.JsonIgnore] 
        [System.Text.Json.Serialization.JsonIgnore] 
        public IFormFile? AvatarFile { get; set; }
    }

}
