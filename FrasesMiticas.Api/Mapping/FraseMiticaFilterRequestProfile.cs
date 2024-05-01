using AutoMapper;
using FrasesMiticas.Core.Dtos.FrasesMiticas;
using FrasesMiticas.Api.ViewModels.Requests;

namespace FrasesMiticas.Api.Mapping
{
    public class FraseMiticaFilterRequestProfile : Profile
    {
        public FraseMiticaFilterRequestProfile()
        {
            CreateMap<FraseMiticaFilterRequest, FraseMiticaFilterDto>();
        }
    }
}
