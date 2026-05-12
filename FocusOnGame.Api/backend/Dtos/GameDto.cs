using System.Text.Json;

namespace FocusOnGame.Api.Dtos
{
    public class GameDto
    {
        public Guid Id { get; set; }

        public Guid IdPathway { get; set; }

        public string Type { get; set; } = string.Empty;

        public int OrderGame { get; set; }

        public JsonDocument Data { get; set; }
    }
}

