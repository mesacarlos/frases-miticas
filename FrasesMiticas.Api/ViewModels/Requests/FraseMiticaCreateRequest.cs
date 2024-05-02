using System;

namespace FrasesMiticas.Api.ViewModels.Requests
{
    public record FraseMiticaCreateRequest(
        string Author,
        DateTime Date,
        string Text,
        string Context);
}
