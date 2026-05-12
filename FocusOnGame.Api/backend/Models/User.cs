using System.ComponentModel.DataAnnotations.Schema;

namespace FocusOnGame.Api.Models
{
    public class User
    {
        [Column("id")]
        public Guid Id { get; set; }

        [Column("firstname")]
        public string FirstName { get; set; }

        [Column("lastname")]
        public string LastName { get; set; }

        [Column("username")]
        public string Username { get; set; }

        [Column("email")]
        public string Email { get; set; }

        [Column("password")]
        public string Password { get; set; }

        [Column("isAdmin")]
        public bool IsAdmin { get; set; } = false;
    }
}