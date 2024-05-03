using AutoMapper;
using FrasesMiticas.Core.Aggregates.AppUsers;
using FrasesMiticas.Core.Dtos.AppUsers;
using FrasesMiticas.Core.Dtos.Quotes;

namespace FrasesMiticas.Infrastructure.Data.Configurations.Mapping
{
    public class AppUserProfile : Profile
    {
        public AppUserProfile()
        {
            CreateMap<AppUser, AppUserDto>().ReverseMap();
            CreateMap<AppUser, InvolvedUserDto>();
        }
    }
}
