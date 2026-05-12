using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;

namespace FocusOnGame.Api.Models
{
    public class Game
    {
        [Key]
        [Column("id")]
        public Guid Id { get; set; }

        [Column("idPathway")]
        public Guid IdPathway { get; set; }

        [Column("type")]
        public string Type { get; set; } = string.Empty;

        [Column("orderGame")]
        public int OrderGame { get; set; }

        [Column("data")]
        public JsonDocument Data { get; set; }
    }
}

