using FrasesMiticas.Core.Interfaces;
using System;
using System.Collections.Generic;

namespace FrasesMiticas.Core.Aggregates.FrasesMiticas
{
    public class FraseMitica : Entity<int>, IAggregateRoot
    {
        public string Author { get; set; }

        public DateTime Date { get; set; }

        public string Text { get; set; }

        public string Context { get; set; }

        public virtual ICollection<Comment> Comments { get; set; }
    }
}
