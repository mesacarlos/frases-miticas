using AutoMapper;
using FrasesMiticas.Api.ViewModels.Responses;
using FrasesMiticas.Core.Dtos.Quotes;

namespace FrasesMiticas.Api.Mapping
{
    public class QuoteReactionProfile : Profile
    {
        public QuoteReactionProfile()
        {
            CreateMap<QuoteReactionDto, QuoteReactionResponse>();
        }
    }
}
