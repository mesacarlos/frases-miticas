using System;
using System.Collections.Generic;

namespace FrasesMiticas.Core.Dtos.FrasesMiticas
{
    public record FraseMiticaDto : EntityDto<int>
    {
        public string Author { get; set; }

        public DateTime Date { get; set; }

        public string Text { get; set; }

        public string Context { get; set; }

        public IEnumerable<CommentDto> Comments { get; set; }
    }
}
