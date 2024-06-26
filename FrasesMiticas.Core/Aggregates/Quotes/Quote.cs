﻿using FrasesMiticas.Core.Aggregates.AppUsers;
using FrasesMiticas.Core.Interfaces;
using System;
using System.Collections.Generic;

namespace FrasesMiticas.Core.Aggregates.Quotes
{
    public class Quote : Entity<int>, IAggregateRoot
    {
        public string Author { get; set; }

        public DateTime Date { get; set; }

        public string Text { get; set; }

        public string Context { get; set; }

        public virtual ICollection<QuoteComment> Comments { get; set; }
        public virtual ICollection<QuoteReaction> Reactions { get; set; }
        public virtual ICollection<AppUser> InvolvedUsers { get; set; }
    }
}
