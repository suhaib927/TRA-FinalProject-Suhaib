using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TRAAuthAPI.Data;
using TRAAuthAPI.Models;
using TRAAuthAPI.Services;

namespace TRAAuthAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly JwtService _jwtService;
        private readonly PasswordHasher<User> _passwordHasher;

        public AuthController(AppDbContext context, JwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
            _passwordHasher = new PasswordHasher<User>();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == request.Username);
            if (user == null)
                return Unauthorized("Kullanıcı bulunamadı");

            var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, request.Password);
            if (result != PasswordVerificationResult.Success)
                return Unauthorized("Şifre hatalı");

            var token = _jwtService.GenerateToken(user.Username, user.Role);
            return Ok(new { token });
        }
    }

    public class LoginRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
