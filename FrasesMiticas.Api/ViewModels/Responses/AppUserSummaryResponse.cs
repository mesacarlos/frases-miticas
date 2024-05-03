namespace FrasesMiticas.Api.ViewModels.Responses
{
    public record AppUserSummaryResponse
    {
        public int Id { get; init; }
        public string Username { get; init; }
        public string FullName { get; init; }
        public bool IsSuperAdmin { get; init; }
        public string ProfilePictureUrl { get; init; }
    }
}
