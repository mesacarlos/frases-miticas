using AutoMapper;
using FrasesMiticas.Core.Interfaces.Tokens;
using FrasesMiticas.Web.ViewModels.Responses;

namespace FrasesMiticas.Web.Mapping
{
    public class UserTokenProfile : Profile
    {
        public UserTokenProfile()
        {
            CreateMap<IUserToken, LoginResponse>();
        }
    }
}
