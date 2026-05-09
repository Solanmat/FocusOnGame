using FocusOnGame.Api.Models;
using Microsoft.AspNetCore.Identity;

namespace FocusOnGame.Api.Services
{
    public class AuthService
    {
        private readonly PasswordHasher<User> _hasher = new();

        public string HashPassword(User user, string password)
        {
            return _hasher.HashPassword(user, password);
        }

        public bool VerifyPassword(User user, string password)
        {
            return _hasher.VerifyHashedPassword(user, user.Password, password)
                   == PasswordVerificationResult.Success;
        }
    }
}