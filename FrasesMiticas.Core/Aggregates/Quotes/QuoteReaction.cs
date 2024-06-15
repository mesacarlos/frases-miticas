using FrasesMiticas.Core.Aggregates.AppUsers;

namespace FrasesMiticas.Core.Aggregates.Quotes
{
    public class QuoteReaction
    {
        public int UserId { get; set; }

        public int QuoteId { get; set; }

        public ReactionType Type { get; set; }

        public virtual AppUser User { get; set; }
        public virtual Quote Quote { get; set; }
    }
}
