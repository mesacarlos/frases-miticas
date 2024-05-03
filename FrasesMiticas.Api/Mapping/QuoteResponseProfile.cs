using AutoMapper;
using FrasesMiticas.Api.ViewModels.Responses;
using FrasesMiticas.Core.Dtos.Quotes;

namespace FrasesMiticas.Api.Mapping
{
    public class QuoteResponseProfile : Profile
    {
        public QuoteResponseProfile()
        {
            CreateMap<QuoteDto, QuoteResponse>();
        }
    }
}
