using System;
using System.Collections.Generic;

namespace FrasesMiticas.Api.ViewModels.Requests
{
    public record QuoteUpdateRequest(
        string Author,
        DateTime Date,
        string Text,
        string Context,
        IEnumerable<int> InvolvedUsers);
}
