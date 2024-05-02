﻿using System;
using System.Collections.Generic;

namespace FrasesMiticas.Core.Dtos.FrasesMiticas
{
    public record FraseMiticaDto : EntityDto<int>
    {
        public string Author { get; init; }

        public DateTime Date { get; init; }

        public string Text { get; init; }

        public string Context { get; init; }

        public IEnumerable<CommentDto> Comments { get; init; }
        public IEnumerable<InvolvedUserDto> InvolvedUsers { get; init; }
    }
}
