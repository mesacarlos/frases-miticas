using FrasesMiticas.Core.Dtos.FrasesMiticas;
using System.Collections.Generic;
using System;

namespace FrasesMiticas.Api.ViewModels.Responses
{
    public record FraseMiticaResponse(
        int Id,
        string Author,
        DateTime Date,
        string Text,
        string Context);
}
