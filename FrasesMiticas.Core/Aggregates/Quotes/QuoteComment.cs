﻿using FrasesMiticas.Core.Aggregates.AppUsers;
using System;

namespace FrasesMiticas.Core.Aggregates.Quotes
{
    public class QuoteComment : Entity<int>
    {
        public int UserId { get; set; }

        public int QuoteId { get; set; }

        public DateTime Date { get; set; }

        public string Text { get; set; }

        public virtual AppUser User { get; set; }
        public virtual Quote Quote { get; set; }
    }
}
