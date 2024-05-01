using AutoMapper;
using FrasesMiticas.Core.Dtos.FrasesMiticas;
using FrasesMiticas.Api.ViewModels.Requests;

namespace FrasesMiticas.Api.Mapping
{
    public class FraseMiticaCreateRequestProfile : Profile
    {
        public FraseMiticaCreateRequestProfile()
        {
            CreateMap<FraseMiticaCreateRequest, FraseMiticaDto>();
        }
    }
}
