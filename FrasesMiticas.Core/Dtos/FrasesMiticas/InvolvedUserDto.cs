namespace FrasesMiticas.Core.Dtos.FrasesMiticas
{
    public record InvolvedUserDto
    {
        public string Username { get; init; }

        public string FullName { get; init; }

        public string ProfilePictureUrl { get; init; }
    }
}
