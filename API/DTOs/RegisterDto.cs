
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [MinLength(3)]
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
