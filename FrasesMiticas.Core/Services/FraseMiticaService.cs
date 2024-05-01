using FrasesMiticas.Core.Aggregates.FrasesMiticas;
using FrasesMiticas.Core.Dtos;
using FrasesMiticas.Core.Dtos.FrasesMiticas;
using FrasesMiticas.Core.Exceptions;
using FrasesMiticas.Core.Interfaces;
using FrasesMiticas.Core.Interfaces.Repositories;
using FrasesMiticas.Core.Interfaces.Services;
using System.Collections.Generic;
using System.Linq;

namespace FrasesMiticas.Core.Services
{
    public class FraseMiticaService : IFraseMiticaService
    {
        private readonly IMapper mapper;
        private readonly IFraseMiticaRepository repository;

        public FraseMiticaService(IMapper mapper,
                                IFraseMiticaRepository repository)
        {
            this.mapper = mapper;
            this.repository = repository;
        }

        public FraseMiticaDto Add(FraseMiticaDto dto)
        {
            FraseMitica entity = mapper.Map<FraseMitica>(dto);
            repository.Add(entity);

            return mapper.Map<FraseMiticaDto>(entity);
        }

        public FraseMiticaDto Update(int id, FraseMiticaDto dto)
        {
            FraseMitica entity = repository.Get(id);
            if (entity == null)
                throw new EntityNotFoundException($"A FraseMitica with ID {id} was not found");

            //Validation successful. Update fields.
            entity.Author = dto.Author;
            entity.Date = dto.Date;
            entity.Text = dto.Text;
            entity.Context = dto.Context;
            entity.Subtitle = dto.Subtitle;

            //Save to persistence
            repository.Update(entity);

            return mapper.Map<FraseMiticaDto>(entity);
        }

        public PagedResultDto<FraseMiticaDto> GetPaginated(FraseMiticaFilterDto filter)
        {
            IEnumerable<FraseMitica> entities = repository.Get();

            int totalItems = entities.Count();
            //If PageNumber or PageSize are not valid, return all data
            if (filter.PageIndex <= 0 || filter.PageSize <= 0)
            {
                var dtos = entities.Select(e => mapper.Map<FraseMiticaDto>(e)).ToList();
                return new PagedResultDto<FraseMiticaDto>(dtos, 1, -1, totalItems);
            }

            //Return queried page
            var pagedDtos = entities
               .Skip((filter.PageIndex - 1) * filter.PageSize)
               .Take(filter.PageSize)
               .Select(e => mapper.Map<FraseMiticaDto>(e))
               .ToList();
            return new PagedResultDto<FraseMiticaDto>(pagedDtos, filter.PageIndex, filter.PageSize, totalItems);
        }

        public FraseMiticaDto Get(int id)
        {
            FraseMitica entity = repository.Get(id);

            if (entity == default)
                throw new EntityNotFoundException<FraseMitica>(id);


            var dto = mapper.Map<FraseMiticaDto>(entity);

            return dto;
        }

        public void Delete(int id)
        {
            repository.Delete(id);
        }
    }
}
