using System;

namespace FrasesMiticas.Api.ViewModels.Requests
{
    public record FraseMiticaUpdateRequest(
        string Author,
        DateTime Date,
        string Text,
        string Context);
}
