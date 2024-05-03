using AutoMapper;
using FrasesMiticas.Core.Aggregates.Quotes;
using FrasesMiticas.Core.Dtos.Quotes;

namespace FrasesMiticas.Infrastructure.Data.Configurations.Mapping
{
    public class QuoteProfile : Profile
    {
        public QuoteProfile()
        {
            CreateMap<Quote, QuoteDto>();

            CreateMap<QuoteDto, Quote>()
                .ForMember(e => e.InvolvedUsers, e => e.Ignore());
        }
    }
}
