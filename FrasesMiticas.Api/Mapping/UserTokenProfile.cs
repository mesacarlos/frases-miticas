using AutoMapper;
using FrasesMiticas.Core.Interfaces.Tokens;
using FrasesMiticas.Api.ViewModels.Responses;

namespace FrasesMiticas.Api.Mapping
{
    public class UserTokenProfile : Profile
    {
        public UserTokenProfile()
        {
            CreateMap<IUserToken, LoginResponse>();
        }
    }
}
