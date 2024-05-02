using AutoMapper;
using FrasesMiticas.Core.Aggregates.FrasesMiticas;
using FrasesMiticas.Core.Dtos.FrasesMiticas;

namespace FrasesMiticas.Infrastructure.Data.Configurations.Mapping
{
    public class CommentProfile : Profile
    {
        public CommentProfile()
        {
            CreateMap<Comment, CommentDto>()
                .ForMember(e => e.Username, e => e.MapFrom(c => c.User.Username))
                .ForMember(e => e.UserFullName, e => e.MapFrom(c => c.User.FullName));

            CreateMap<CommentDto, Comment>();
        }
    }
}
