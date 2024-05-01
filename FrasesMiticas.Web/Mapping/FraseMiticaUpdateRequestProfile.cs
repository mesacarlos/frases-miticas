using AutoMapper;
using FrasesMiticas.Core.Dtos.FrasesMiticas;
using FrasesMiticas.Web.ViewModels.Requests;

namespace FrasesMiticas.Web.Mapping
{
    public class FraseMiticaUpdateRequestProfile : Profile
    {
        public FraseMiticaUpdateRequestProfile()
        {
            CreateMap<FraseMiticaUpdateRequest, FraseMiticaDto>();
        }
    }
}
