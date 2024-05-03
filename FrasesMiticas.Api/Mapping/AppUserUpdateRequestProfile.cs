using AutoMapper;
using FrasesMiticas.Core.Dtos.AppUsers;
using FrasesMiticas.Api.ViewModels.Requests;

namespace FrasesMiticas.Api.Mapping
{
    public class AppUserUpdateRequestProfile : Profile
    {
        public AppUserUpdateRequestProfile()
        {
            CreateMap<AdminAppUserUpdateRequest, AppUserDto>();
        }
    }
}
