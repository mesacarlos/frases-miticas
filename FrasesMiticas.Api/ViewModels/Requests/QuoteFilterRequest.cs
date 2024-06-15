using FrasesMiticas.Core.Aggregates.Quotes;
using System;
using System.Collections.Generic;

namespace FrasesMiticas.Api.ViewModels.Requests
{
    public record QuoteFilterRequest(
        int PageSize,
        int PageIndex,
        string Text,
        DateTime? FromDate,
        DateTime? ToDate,
        IEnumerable<int> InvolvedUsers,
        IEnumerable<ReactionType> ReactedWith);
}
