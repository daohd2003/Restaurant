using restaurantWebAPI.Models;

namespace restaurantWebAPI.DTOs
{
    public class CategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Slug { get; set; }
        public bool IsActive { get; set; }
        public int DisplayOrder { get; set; }
        public List<MenuItemDto> MenuItems { get; set; }
    }

}
