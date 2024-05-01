using FrasesMiticas.Core.Dtos;

namespace FrasesMiticas.Web.ViewModels.Responses
{
    public record AppUserResponse
    {
        public int Id { get; init; }
        public string Username { get; init; }
        public string Email { get; init; }
        public string FullName { get; init; }
        public bool IsSuperAdmin { get; init; }
    }
}
