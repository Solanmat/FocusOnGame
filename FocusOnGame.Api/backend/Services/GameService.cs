using Microsoft.EntityFrameworkCore;
using FocusOnGame.Api.Data;
using FocusOnGame.Api.Dtos;
using FocusOnGame.Api.Models;

namespace FocusOnGame.Api.Services
{
    public class GameService
    {
        private readonly AppDbContext _context;

        public GameService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<GameDto>> GetGames(Guid idPathway)
        {
            return await _context.Games
                .Where(g => g.IdPathway == idPathway)
                .OrderBy(g => g.OrderGame)
                .Select(g => new GameDto
                {
                    Id = g.Id,
                    IdPathway = g.IdPathway,
                    Type = g.Type,
                    OrderGame = g.OrderGame,
                    Data = g.Data
                })
                .ToListAsync();
        }

        public async Task<GameDto> CreateGame(GameDto dto)
        {
            var game = new Game
            {
                Id = dto.Id,
                IdPathway = dto.IdPathway,
                Type = dto.Type,
                OrderGame = dto.OrderGame,
                Data = dto.Data
            };

            _context.Games.Add(game);

            await _context.SaveChangesAsync();

            dto.Id = game.Id;

            return dto;
        }

        public async Task<GameDto?> UpdateGame(Guid id, GameDto dto)
        {
            var game = await _context.Games.FindAsync(id);

            if (game == null)
                return null;

            game.Type = dto.Type;
            game.OrderGame = dto.OrderGame;
            game.Data = dto.Data;

            await _context.SaveChangesAsync();

            return dto;
        }

        public async Task<bool> DeleteGame(Guid id)
        {
            var game = await _context.Games.FindAsync(id);

            if (game == null)
                return false;

            _context.Games.Remove(game);

            await _context.SaveChangesAsync();

            return true;
        }
    }
}

