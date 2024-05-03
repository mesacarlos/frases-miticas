using System;

namespace FrasesMiticas.Core.Dtos.Quotes
{
    public record QuoteCommentDto : EntityDto<int>
    {
        public int UserId { get; init; }

        public int PhraseId { get; init; }

        public DateTime Date { get; init; }

        public string Text { get; init; }

        public string Username { get; init; }

        public string UserFullName { get; init; }
    }
}
