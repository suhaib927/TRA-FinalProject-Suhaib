using System;
using System.ComponentModel.DataAnnotations;

namespace TRAAuthAPI.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Username { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        [Required]
        public string Role { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
