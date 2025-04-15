using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using restaurantWebAPI.Models;

namespace restaurantWebAPI.Configuration
{
    public class CategoryConfiguration : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder.ToTable("Categories");

            builder.HasKey(c => c.Id);

            builder.Property(c => c.Name)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(c => c.Slug)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(c => c.IsActive)
                .HasDefaultValue(true);

            builder.Property(c => c.DisplayOrder)
                .IsRequired();

            // Navigation
            builder.HasMany(c => c.MenuItems)
                .WithOne(m => m.Category)
                .HasForeignKey(m => m.CategoryId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
