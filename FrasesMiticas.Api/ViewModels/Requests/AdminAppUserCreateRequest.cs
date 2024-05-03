using FrasesMiticas.Core.Dtos;

namespace FrasesMiticas.Api.ViewModels.Requests
{
    public record AdminAppUserCreateRequest
    {
        public string Username { get; init; }
        public string Email { get; init; }
        public string Password { get; init; }
        public string FullName { get; init; }
        public bool IsSuperAdmin { get; init; }
    }
}
