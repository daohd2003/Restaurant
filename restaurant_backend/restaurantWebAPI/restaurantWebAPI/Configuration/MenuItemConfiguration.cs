using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using restaurantWebAPI.Models;

namespace restaurantWebAPI.Configuration
{
    public class MenuItemConfiguration : IEntityTypeConfiguration<MenuItem>
    {
        public void Configure(EntityTypeBuilder<MenuItem> builder)
        {
            builder.ToTable("MenuItems");

            builder.HasKey(m => m.Id);

            builder.Property(m => m.Name)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(m => m.Description)
                .HasMaxLength(500);

            builder.Property(m => m.Price)
                .IsRequired()
                .HasColumnType("decimal(18,2)");

            builder.Property(m => m.ImageUrl)
                .HasMaxLength(255);

            builder.Property(m => m.IsFeatured)
                .IsRequired();

            builder.Property(m => m.IsAvailable)
                .HasDefaultValue(true);

            builder.Property(m => m.SpicyLevel)
                .HasMaxLength(20);

            builder.Property(m => m.PreparationTime)
                .IsRequired();

            builder.Property(m => m.CreatedDate)
                .HasDefaultValueSql("GETDATE()");
        }
    }
}
