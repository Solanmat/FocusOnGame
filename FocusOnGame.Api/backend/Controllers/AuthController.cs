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

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
        
            var existingUser = _context.Users
            .FirstOrDefault(x => x.Username == dto.Username);

            var existingEmail = _context.Users
            .FirstOrDefault(x => x.Email == dto.Email);

            if ((existingUser != null) || (existingEmail != null))
            {
                return BadRequest(new { message = "Username already exists" });
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

            return Ok("User created");
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDto loginDto)
        {
            var user = _context.Users.FirstOrDefault(x => x.Email == loginDto.Email);

            if (user == null)
            {
                Console.WriteLine("test 1");
                return Unauthorized();
            }

            if (!_authService.VerifyPassword(user, loginDto.Password))
            {
                Console.WriteLine("test 2");
                return Unauthorized();
            }

            Console.WriteLine(user.Username);

            return Ok("Login success");
        }
    }
}
