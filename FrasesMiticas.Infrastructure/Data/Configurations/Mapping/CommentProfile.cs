using AutoMapper;
using FrasesMiticas.Core.Aggregates.Quotes;
using FrasesMiticas.Core.Dtos.Quotes;

namespace FrasesMiticas.Infrastructure.Data.Configurations.Mapping
{
    public class CommentProfile : Profile
    {
        public CommentProfile()
        {
            CreateMap<Comment, QuoteCommentDto>()
                .ForMember(e => e.Username, e => e.MapFrom(c => c.User.Username))
                .ForMember(e => e.UserFullName, e => e.MapFrom(c => c.User.FullName));

            CreateMap<QuoteCommentDto, Comment>();
        }
    }
}
