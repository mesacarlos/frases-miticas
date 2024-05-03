using AutoMapper;
using FrasesMiticas.Core.Dtos.AppUsers;
using FrasesMiticas.Api.ViewModels.Responses;

namespace FrasesMiticas.Api.Mapping
{
    public class AppUserResponseProfile : Profile
    {
        public AppUserResponseProfile()
        {
            CreateMap<AppUserDto, AppUserAdminResponse>();
        }
    }
}
