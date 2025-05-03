namespace restaurantWebAPI.Models
{
    public class UserRefreshToken
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public virtual User User { get; set; } // Navigation property

        public string Token { get; set; } // Lưu giá trị refresh token (đã hash)

        public DateTime ExpiryDate { get; set; } // Thời hạn token

        public bool IsRevoked { get; set; } = false; // Đánh dấu thu hồi

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public string DeviceId { get; set; } // ID thiết bị (nếu có)

        public string IpAddress { get; set; } // IP tạo token
    }
}
