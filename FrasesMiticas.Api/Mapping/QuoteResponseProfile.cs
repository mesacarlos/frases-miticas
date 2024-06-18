using AutoMapper;
using FrasesMiticas.Api.ViewModels.Responses;
using FrasesMiticas.Core.Dtos.Quotes;
using System.Linq;

namespace FrasesMiticas.Api.Mapping
{
    public class QuoteResponseProfile : Profile
    {
        public QuoteResponseProfile()
        {
            CreateMap<QuoteDto, QuoteResponse>();

            CreateMap<QuoteDto, QuoteWithNumberOfCommentsResponse>()
                .ForCtorParam(
                    nameof(QuoteWithNumberOfCommentsResponse.CommentCount),
                    opt => opt.MapFrom(src => src.Comments.Count())
                );
        }
    }
}
