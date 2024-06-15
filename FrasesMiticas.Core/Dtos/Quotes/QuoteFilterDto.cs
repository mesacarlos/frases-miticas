using System.Collections.Generic;
using System;
using FrasesMiticas.Core.Aggregates.Quotes;

namespace FrasesMiticas.Core.Dtos.Quotes
{
    public record QuoteFilterDto(
        int PageSize,
        int PageIndex,
        string Text,
        DateTime? FromDate,
        DateTime? ToDate,
        IEnumerable<int> InvolvedUsers,
        IEnumerable<ReactionType> ReactedWith);
}
