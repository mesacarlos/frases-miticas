using AutoMapper;
using FrasesMiticas.Core.Aggregates.AppUsers;
using FrasesMiticas.Core.Dtos.AppUsers;

namespace FrasesMiticas.Infrastructure.Data.Configurations.Mapping
{
    public class AppUserProfile : Profile
    {
        public AppUserProfile()
        {
            CreateMap<AppUser, AppUserDto>().ReverseMap();
        }
    }
}
