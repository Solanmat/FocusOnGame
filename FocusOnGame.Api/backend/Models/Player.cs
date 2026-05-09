namespace FocusOnGame.Api.Models
{
    public class Player
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();

        public string Name { get; set; }

        public int Score { get; set; } = 0;
    }
}