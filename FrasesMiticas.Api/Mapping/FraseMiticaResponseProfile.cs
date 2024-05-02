using AutoMapper;
using FrasesMiticas.Api.ViewModels.Responses;
using FrasesMiticas.Core.Dtos.FrasesMiticas;

namespace FrasesMiticas.Api.Mapping
{
    public class FraseMiticaResponseProfile : Profile
    {
        public FraseMiticaResponseProfile()
        {
            CreateMap<FraseMiticaDto, FraseMiticaResponse>();
        }
    }
}
