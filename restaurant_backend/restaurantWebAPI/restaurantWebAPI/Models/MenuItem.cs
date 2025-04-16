using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace restaurantWebAPI.Models
{
    public class MenuItem
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string Name { get; set; } // e.g., "Bò bít tết"

        public string? Description { get; set; }

        [Column(TypeName = "decimal(10, 2)")]
        public decimal Price { get; set; }

        public string? ImageUrl { get; set; }

        public string? SpicyLevel { get; set; } // e.g., "Mild", "Medium", "Hot"

        public int PreparationTime { get; set; } // Phút

        public bool IsAvailable { get; set; } = true;

        public bool IsFeatured { get; set; } = false;

        public DateTime CreatedDate { get; set; } = DateTime.Now;

        // Foreign Key
        [ForeignKey("Category")]
        public int CategoryId { get; set; }

        [NotMapped]
        [JsonIgnore]
        public virtual Category? Category { get; set; }
    }
}
