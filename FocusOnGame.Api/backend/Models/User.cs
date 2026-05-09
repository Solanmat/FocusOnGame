using System.ComponentModel.DataAnnotations.Schema;

namespace FocusOnGame.Api.Models
{
    public class User
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("firstName")]
        public string FirstName { get; set; }

        [Column("lastName")]
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