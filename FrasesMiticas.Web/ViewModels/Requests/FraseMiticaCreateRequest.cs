using System;

namespace FrasesMiticas.Web.ViewModels.Requests
{
    public record FraseMiticaCreateRequest(
        string Author,
        DateTime Date,
        string Text,
        string Context,
        string Subtitle);
}
