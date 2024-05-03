using System;
using System.Collections.Generic;

namespace FrasesMiticas.Api.ViewModels.Requests
{
    public record QuoteFilterRequest(
        int PageSize,
        int PageIndex,
        DateTime? FromDate,
        DateTime? ToDate,
        IEnumerable<int> InvolvedUsers);
}
