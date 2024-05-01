using AutoMapper;
using FrasesMiticas.Core.Dtos.AppUsers;
using FrasesMiticas.Web.ViewModels.Requests;

namespace FrasesMiticas.Web.Mapping
{
    public class AppUserUpdateRequestProfile : Profile
    {
        public AppUserUpdateRequestProfile()
        {
            CreateMap<AppUserUpdateRequest, AppUserDto>();
        }
    }
}
