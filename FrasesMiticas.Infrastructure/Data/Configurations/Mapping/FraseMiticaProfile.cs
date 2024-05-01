using AutoMapper;
using FrasesMiticas.Core.Aggregates.FrasesMiticas;
using FrasesMiticas.Core.Dtos.FrasesMiticas;

namespace FrasesMiticas.Infrastructure.Data.Configurations.Mapping
{
    public class FraseMiticaProfile : Profile
    {
        public FraseMiticaProfile()
        {
            CreateMap<FraseMitica, FraseMiticaDto>().ReverseMap();
        }
    }
}
