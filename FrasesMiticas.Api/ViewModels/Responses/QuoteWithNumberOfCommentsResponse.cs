using FrasesMiticas.Core.Dtos.Quotes;
using System.Collections.Generic;
using System;

namespace FrasesMiticas.Api.ViewModels.Responses
{
    public record QuoteWithNumberOfCommentsResponse(
        int Id,
        string Author,
        DateTime Date,
        string Text,
        string Context,
        IEnumerable<InvolvedUserDto> InvolvedUsers,
        int CommentCount);
}
