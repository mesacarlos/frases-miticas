﻿using AutoMapper;
using FrasesMiticas.Core.Aggregates.Quotes;
using FrasesMiticas.Core.Dtos.Quotes;

namespace FrasesMiticas.Infrastructure.Data.Configurations.Mapping
{
    public class ReactionProfile : Profile
    {
        public ReactionProfile()
        {
            CreateMap<QuoteReaction, QuoteReactionDto>();

            CreateMap<QuoteReactionDto, QuoteReaction>();
        }
    }
}
