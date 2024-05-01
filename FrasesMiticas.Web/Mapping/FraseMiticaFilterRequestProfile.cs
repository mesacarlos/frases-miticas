using AutoMapper;
using FrasesMiticas.Core.Dtos.FrasesMiticas;
using FrasesMiticas.Web.ViewModels.Requests;

namespace FrasesMiticas.Web.Mapping
{
    public class FraseMiticaFilterRequestProfile : Profile
    {
        public FraseMiticaFilterRequestProfile()
        {
            CreateMap<FraseMiticaFilterRequest, FraseMiticaFilterDto>();
        }
    }
}
