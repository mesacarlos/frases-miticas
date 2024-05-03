using System;

namespace FrasesMiticas.Api.ViewModels.Requests
{
    public record QuoteCreateRequest(
        string Author,
        DateTime Date,
        string Text,
        string Context);
}
