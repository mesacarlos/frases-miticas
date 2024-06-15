using FrasesMiticas.Core.Aggregates.Quotes;

namespace FrasesMiticas.Core.Dtos.Quotes
{
    public record QuoteReactionDto
    {
        public int UserId { get; init; }

        public int QuoteId { get; init; }

        public ReactionType Type { get; init; }
    }
}
