using FrasesMiticas.Core.Interfaces;

namespace FrasesMiticas.Core.Aggregates.AppUsers
{
    public class AppUser : Entity<int>, IAggregateRoot
    {
        public string Username { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string FullName { get; set; }

        public bool IsSuperAdmin { get; set; }
    }
}
