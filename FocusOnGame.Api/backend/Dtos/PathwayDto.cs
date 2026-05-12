namespace FocusOnGame.Api.Dtos
{
    public class PathwayDto
    {
        public Guid Id { get; set; }

        public Guid IdUser { get; set; }

        public string Name { get; set; }  = string.Empty;
    }
}