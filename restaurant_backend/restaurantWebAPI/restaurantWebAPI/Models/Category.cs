using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace restaurantWebAPI.Models
{
    public class Category
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string Name { get; set; } // e.g., "Món chính", "Khai vị"

        [Required, MaxLength(100)]
        public string Slug { get; set; } // e.g., "main-courses", "starters"

        public bool IsActive { get; set; } = true;

        public int DisplayOrder { get; set; } = 0;

        // Navigation property
        public virtual ICollection<MenuItem> MenuItems { get; set; }
    }
}
