using Microsoft.AspNetCore.Mvc;
using FocusOnGame.Api.Dtos;
using FocusOnGame.Api.Services;

namespace FocusOnGame.Api.Controllers;

[ApiController]
[Route("api/pathways")]
public class PathwaysController : ControllerBase
{
    private readonly PathwayService _pathwayService;

    public PathwaysController(PathwayService pathwayService)
    {
        _pathwayService = pathwayService;
    }

    [HttpGet("{idUser}")]
    public async Task<IActionResult> GetPathways(Guid idUser)
    {
        var pathways = await _pathwayService.GetPathways(idUser);
        return Ok(pathways);
    }

    [HttpPost]
    public async Task<IActionResult> CreatePathway([FromBody] PathwayDto dto)
    {
        var pathway = await _pathwayService.CreatePathway(dto);
        return Ok(pathway);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdatePathway(Guid id, [FromBody] PathwayDto dto)
    {
        var pathway = await _pathwayService.UpdatePathway(id, dto);

        if (pathway == null)
            return NotFound();

        return Ok(pathway);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePathway(Guid id)
    {
        var success = await _pathwayService.DeletePathway(id);

        if (!success)
            return NotFound();

        return NoContent();
    }
}
