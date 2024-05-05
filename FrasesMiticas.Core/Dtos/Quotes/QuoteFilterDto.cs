using System.Collections.Generic;
using System;

namespace FrasesMiticas.Core.Dtos.Quotes
{
    public record QuoteFilterDto(
        int PageSize,
        int PageIndex,
        string Text,
        DateTime? FromDate,
        DateTime? ToDate,
        IEnumerable<int> InvolvedUsers);
}
