using Microsoft.AspNetCore.Mvc;
using FocusOnGame.Api.Models;
using FocusOnGame.Api.Services;
using FocusOnGame.Api.Data;
using FocusOnGame.Api.Dtos;

namespace FocusOnGame.Api.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly AuthService _authService;

        public AuthController(AppDbContext context, AuthService authService)
        {
            _context = context;
            _authService = authService;
        }

        // 🧾 REGISTER
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            var existingUser = _context.Users
                .FirstOrDefault(x => x.Username == dto.Username);

            var existingEmail = _context.Users
                .FirstOrDefault(x => x.Email == dto.Email);

            if (existingUser != null || existingEmail != null)
            {
                return BadRequest(new { message = "Username or email already exists" });
            }

            var user = new User
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Username = dto.Username,
                Email = dto.Email,
                IsAdmin = false
            };

            user.Password = _authService.HashPassword(user, dto.Password);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                userId = user.Id
            });
        }

        // 🔐 LOGIN
        [HttpPost("login")]
        public IActionResult Login(LoginDto loginDto)
        {
            var user = _context.Users
                .FirstOrDefault(x => x.Email == loginDto.Email);

            if (user == null)
            {
                return Unauthorized(new { message = "Invalid credentials" });
            }

            if (!_authService.VerifyPassword(user, loginDto.Password))
            {
                return Unauthorized(new { message = "Invalid credentials" });
            }

            return Ok(new LoginResponseDto
            {
                Id = user.Id,
                Username = user.Username
            });
        }
    }
}