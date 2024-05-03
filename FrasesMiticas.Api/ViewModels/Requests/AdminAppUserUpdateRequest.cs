namespace FrasesMiticas.Api.ViewModels.Requests
{
    public record AdminAppUserUpdateRequest
    {
        public string Username { get; init; }
        public string Email { get; init; }
        public string FullName { get; init; }
    }
}
