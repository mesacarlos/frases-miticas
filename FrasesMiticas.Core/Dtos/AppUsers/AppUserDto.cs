namespace FrasesMiticas.Core.Dtos.AppUsers
{
    public record AppUserDto : EntityDto<int>
    {
        public string Username { get; init; }
        public string Email { get; init; }
        public string Password { get; init; }
        public string FullName { get; init; }
        public bool IsSuperAdmin { get; init; }
    }
}
