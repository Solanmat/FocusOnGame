using Microsoft.EntityFrameworkCore;
using FocusOnGame.Api.Data;
using FocusOnGame.Api.Dtos;
using FocusOnGame.Api.Models;

namespace FocusOnGame.Api.Services
{
    public class PathwayService
    {
        private readonly AppDbContext _context;

        public PathwayService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<PathwayDto>> GetPathways(Guid idUser)
        {
            return await _context.Pathways
                .Where(p => p.IdUser == idUser)
                .Select(g => new PathwayDto
                {
                    Id = g.Id,
                    Name = g.Name,
                    IdUser = g.IdUser
                })
                .ToListAsync();
        }

        public async Task<PathwayDto> CreatePathway(PathwayDto dto)
        {
            var pathway = new Pathway
            {
                Name = dto.Name,
                IdUser = dto.IdUser
            };

            _context.Pathways.Add(pathway);

            await _context.SaveChangesAsync();

            dto.Id = pathway.Id;

            return dto;
        }

        public async Task<PathwayDto?> UpdatePathway(Guid id, PathwayDto dto)
        {
            var pathway = await _context.Pathways.FindAsync(id);

            if (pathway == null)
                return null;

            pathway.Name = dto.Name;

            await _context.SaveChangesAsync();

            return dto;
        }

        public async Task<bool> DeletePathway(Guid id)
        {
            var pathway = await _context.Pathways.FindAsync(id);

            if (pathway == null)
                return false;

            _context.Games.RemoveRange(_context.Games.Where(g => g.IdPathway == id)
);
            _context.Pathways.Remove(pathway);

            await _context.SaveChangesAsync();

            return true;
        }
    }
}

