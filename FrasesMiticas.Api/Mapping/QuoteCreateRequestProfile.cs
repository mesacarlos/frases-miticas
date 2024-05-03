using AutoMapper;
using FrasesMiticas.Core.Dtos.Quotes;
using FrasesMiticas.Api.ViewModels.Requests;

namespace FrasesMiticas.Api.Mapping
{
    public class QuoteCreateRequestProfile : Profile
    {
        public QuoteCreateRequestProfile()
        {
            CreateMap<QuoteCreateRequest, QuoteDto>();
            CreateMap<int, InvolvedUserDto>().ConstructUsing(i => new InvolvedUserDto()
            {
                Id = i
            });
        }
    }
}
