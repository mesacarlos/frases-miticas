using FrasesMiticas.Core.Interfaces;

namespace FrasesMiticas.Infrastructure
{
    public class Mapper : IMapper
    {
        private readonly AutoMapper.IMapper mapper;


        public Mapper(AutoMapper.IMapper mapper)
        {
            this.mapper = mapper;
        }


        public TDestination Map<TDestination>(object source) => mapper.Map<TDestination>(source);
    }
}
