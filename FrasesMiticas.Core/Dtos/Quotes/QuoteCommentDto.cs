using FrasesMiticas.Core.Dtos.AppUsers;
using System;

namespace FrasesMiticas.Core.Dtos.Quotes
{
    public record QuoteCommentDto : EntityDto<int>
    {
        public int UserId { get; init; }

        public int QuoteId { get; init; }

        public DateTime Date { get; init; }

        public string Text { get; init; }

        public AppUserSummaryDto User { get; init; }
    }
}
