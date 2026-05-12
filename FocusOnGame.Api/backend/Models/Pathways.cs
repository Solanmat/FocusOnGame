using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FocusOnGame.Api.Models
{
    public class Pathway
    {
        [Key]
        [Column("id")]
        public Guid Id { get; set; }

        [Column("idUser")]
        public Guid IdUser { get; set; }


        [Column("name")]
        public string Name { get; set; }
    }
}