using FrasesMiticas.Core.Aggregates.Quotes;

namespace FrasesMiticas.Api.ViewModels.Responses
{
    public record QuoteReactionResponse(
        int UserId,
        string Type);
}
