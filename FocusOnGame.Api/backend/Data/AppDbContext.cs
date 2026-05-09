using Microsoft.EntityFrameworkCore;
using FocusOnGame.Api.Models;


namespace FocusOnGame.Api.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }
    }
}