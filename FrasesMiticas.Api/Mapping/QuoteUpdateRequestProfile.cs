using AutoMapper;
using FrasesMiticas.Core.Dtos.Quotes;
using FrasesMiticas.Api.ViewModels.Requests;

namespace FrasesMiticas.Api.Mapping
{
    public class QuoteUpdateRequestProfile : Profile
    {
        public QuoteUpdateRequestProfile()
        {
            CreateMap<QuoteUpdateRequest, QuoteDto>();
        }
    }
}
