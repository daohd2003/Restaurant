namespace restaurantWebAPI.DTOs
{
    public class MenuItemDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string ImageUrl { get; set; }
        public bool IsAvailable { get; set; }
        public string SpicyLevel { get; set; }
        public int PreparationTime { get; set; }
        public bool IsFeatured { get; set; }
    }
}
