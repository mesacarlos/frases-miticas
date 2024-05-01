using AutoMapper;
using FrasesMiticas.Core.Dtos.FrasesMiticas;
using FrasesMiticas.Web.ViewModels.Requests;

namespace FrasesMiticas.Web.Mapping
{
    public class FraseMiticaCreateRequestProfile : Profile
    {
        public FraseMiticaCreateRequestProfile()
        {
            CreateMap<FraseMiticaCreateRequest, FraseMiticaDto>();
        }
    }
}
