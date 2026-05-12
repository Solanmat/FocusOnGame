using Microsoft.EntityFrameworkCore;
using FocusOnGame.Api.Models;


namespace FocusOnGame.Api.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public DbSet<Game> Games => Set<Game>();

        public DbSet<Pathway> Pathways => Set<Pathway>();

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }
    }
}