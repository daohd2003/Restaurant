using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using restaurantWebAPI.Models;

namespace restaurantWebAPI.Configuration
{
    public class UserRefreshTokenConfiguration : IEntityTypeConfiguration<UserRefreshToken>
    {
        public void Configure(EntityTypeBuilder<UserRefreshToken> builder)
        {
            builder.ToTable("UserRefreshTokens");

            // Primary Key
            builder.HasKey(urt => urt.Id);

            // Cấu hình các trường
            builder.Property(urt => urt.Token)
                .IsRequired()
                .HasMaxLength(500);

            builder.Property(urt => urt.ExpiryDate)
                .IsRequired();

            builder.Property(urt => urt.IsRevoked)
                .HasDefaultValue(false);

            builder.Property(urt => urt.CreatedAt)
                .HasDefaultValueSql("GETUTCDATE()"); // Sử dụng hàm SQL

            builder.Property(urt => urt.DeviceId)
                .IsUnicode()
                .HasColumnType("nvarchar(max)");

            builder.Property(urt => urt.IpAddress)
                .IsUnicode()
                .HasColumnType("nvarchar(max)");

            // Cấu hình quan hệ với bảng User
            builder.HasOne(urt => urt.User)
                .WithMany(u => u.RefreshTokens) // Navigation property từ User
                .HasForeignKey(urt => urt.UserId)
                .OnDelete(DeleteBehavior.Cascade); // Xóa token khi user bị xóa

            // Tạo index cho Token (để tìm kiếm nhanh)
            builder.HasIndex(urt => urt.Token)
                .IsUnique();

            // Index cho UserId
            builder.HasIndex(urt => urt.UserId);
        }
    }
}