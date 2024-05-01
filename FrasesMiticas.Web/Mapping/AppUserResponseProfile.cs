using AutoMapper;
using FrasesMiticas.Core.Dtos.AppUsers;
using FrasesMiticas.Web.ViewModels.Responses;

namespace FrasesMiticas.Web.Mapping
{
    public class AppUserResponseProfile : Profile
    {
        public AppUserResponseProfile()
        {
            CreateMap<AppUserDto, AppUserResponse>();
        }
    }
}
