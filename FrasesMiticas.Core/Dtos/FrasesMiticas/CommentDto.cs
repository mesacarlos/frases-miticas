using System;

namespace FrasesMiticas.Core.Dtos.FrasesMiticas
{
    public record CommentDto : EntityDto<int>
    {
        public int UserId { get; set; }

        public int PhraseId { get; set; }

        public DateTime Date { get; set; }

        public string Text { get; set; }

        public string Username { get; set; }

        public string UserFullName { get; set; }
    }
}
