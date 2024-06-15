using AutoMapper;
using FrasesMiticas.Core.Aggregates.Quotes;
using FrasesMiticas.Core.Dtos.Quotes;

namespace FrasesMiticas.Infrastructure.Data.Configurations.Mapping
{
    public class CommentProfile : Profile
    {
        public CommentProfile()
        {
            CreateMap<QuoteComment, QuoteCommentDto>();

            CreateMap<QuoteCommentDto, QuoteComment>();
        }
    }
}
