using FrasesMiticas.Core.Aggregates.Quotes;
using FrasesMiticas.Core.Interfaces;
using System.Collections.Generic;

namespace FrasesMiticas.Core.Aggregates.AppUsers
{
    public class AppUser : Entity<int>, IAggregateRoot
    {
        public string Username { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string FullName { get; set; }

        public bool IsSuperAdmin { get; set; }

        public string ProfilePictureUrl { get; set; }

        public virtual ICollection<Quote> InvolvedPhrases { get; set; }
    }
}
