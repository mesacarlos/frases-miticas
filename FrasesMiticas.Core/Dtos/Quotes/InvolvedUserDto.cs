namespace FrasesMiticas.Core.Dtos.Quotes
{
    public record InvolvedUserDto
    {
        public int Id { get; init; }

        public string Username { get; init; }

        public string FullName { get; init; }

        public string ProfilePictureUrl { get; init; }
    }
}
