using AutoMapper;
using FrasesMiticas.Core.Dtos.Quotes;
using FrasesMiticas.Api.ViewModels.Requests;

namespace FrasesMiticas.Api.Mapping
{
    public class QuoteFilterRequestProfile : Profile
    {
        public QuoteFilterRequestProfile()
        {
            CreateMap<QuoteFilterRequest, QuoteFilterDto>();
        }
    }
}
