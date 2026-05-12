using Microsoft.AspNetCore.Mvc;
using FocusOnGame.Api.Dtos;
using FocusOnGame.Api.Services;

namespace FocusOnGame.Api.Controllers;

[ApiController]
[Route("api/games")]
public class GamesController : ControllerBase
{
    private readonly GameService _gameService;

    public GamesController(GameService gameService)
    {
        _gameService = gameService;
    }

    [HttpGet("{idPathway}")]
    public async Task<IActionResult> GetGames(Guid idPathway)
    {
        var games = await _gameService.GetGames(idPathway);
        return Ok(games);
    }

    [HttpPost]
    public async Task<IActionResult> CreateGame([FromBody] GameDto dto)
    {
        Console.WriteLine(dto.IdPathway);
        var game = await _gameService.CreateGame(dto);
        return Ok(game);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateGame(
        Guid id,
        [FromBody] GameDto dto)
    {
        var game = await _gameService.UpdateGame(id, dto);

        if (game == null)
            return NotFound();

        return Ok(game);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteGame(Guid id)
    {
        var success = await _gameService.DeleteGame(id);

        if (!success)
            return NotFound();

        return NoContent();
    }
}