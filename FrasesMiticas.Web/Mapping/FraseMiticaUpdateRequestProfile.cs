using AutoMapper;
using FrasesMiticas.Core.Dtos.FrasesMiticas;
using FrasesMiticas.Api.ViewModels.Requests;

namespace FrasesMiticas.Api.Mapping
{
    public class FraseMiticaUpdateRequestProfile : Profile
    {
        public FraseMiticaUpdateRequestProfile()
        {
            CreateMap<FraseMiticaUpdateRequest, FraseMiticaDto>();
        }
    }
}
