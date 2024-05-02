using FrasesMiticas.Core.Aggregates.AppUsers;
using System;

namespace FrasesMiticas.Core.Aggregates.FrasesMiticas
{
    public class Comment : Entity<int>
    {
        public int UserId { get; set; }

        public int PhraseId { get; set; }

        public DateTime Date { get; set; }

        public string Text { get; set; }

        public virtual AppUser User { get; set; }
        public virtual FraseMitica FraseMitica { get; set; }
    }
}
