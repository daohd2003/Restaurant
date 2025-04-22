﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using restaurantWebAPI.Models;

namespace restaurantWebAPI.Configuration
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("Users");

            builder.HasKey(u => u.Id);

            builder.Property(u => u.FullName)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(u => u.Email)
                .IsRequired()
                .HasMaxLength(100);

            builder.HasIndex(u => u.Email)
                .IsUnique();

            builder.Property(u => u.PasswordHash)
                .IsRequired();

            builder.Property(u => u.Phone)
                .HasMaxLength(15);

            builder.Property(u => u.Role)
                .IsRequired()
                .HasMaxLength(30);

            builder.Property(u => u.Address)
                .HasMaxLength(255);

            builder.Property(u => u.AvatarUrl)
                .HasMaxLength(255);
        }
    }
}
