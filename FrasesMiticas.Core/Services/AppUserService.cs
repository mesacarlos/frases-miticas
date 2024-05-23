using FrasesMiticas.Core.Exceptions;
using FrasesMiticas.Core.Interfaces.Repositories;
using FrasesMiticas.Core.Interfaces;
using FrasesMiticas.Core.Interfaces.Services;
using System.Collections.Generic;
using System.Linq;
using FrasesMiticas.Core.Aggregates.AppUsers;
using FrasesMiticas.Core.Dtos.AppUsers;

namespace FrasesMiticas.Core.Services
{
    public class AppUserService : IAppUserService
    {
        private readonly IMapper mapper;
        private readonly IAppUserRepository repository;

        public AppUserService(IMapper mapper,
            IAppUserRepository repository)
        {
            this.mapper = mapper;
            this.repository = repository;
        }

        public AppUserDto Add(AppUserDto dto)
        {
            AppUser entity = mapper.Map<AppUser>(dto);
            repository.Add(entity);

            return mapper.Map<AppUserDto>(entity);
        }

        public AppUserDto Update(int id, AppUserDto dto)
        {
            AppUser entity = repository.Get(id);
            if (entity == null)
                throw new EntityNotFoundException($"User with identifier {id} was not found.");

            //Validation successful. Update fields.
            entity.Username = dto.Username;
            entity.Email = dto.Email;
            entity.FullName = dto.FullName;
            entity.IsSuperAdmin = dto.IsSuperAdmin;
            entity.ProfilePictureUrl = dto.ProfilePictureUrl;

            //Save to persistence
            repository.Update(entity);

            return mapper.Map<AppUserDto>(entity);
        }

        public ICollection<AppUserDto> Get()
        {
            ICollection<AppUser> entities = repository.Get();

            var dtos = entities.Select(e => mapper.Map<AppUserDto>(e)).ToList();

            return dtos;
        }

        public AppUserDto Get(int id)
        {
            AppUser entity = repository.Get(id);

            if (entity == default)
                throw new EntityNotFoundException<AppUser>(id);


            var dto = mapper.Map<AppUserDto>(entity);

            return dto;
        }

        public void Delete(int id)
        {
            repository.Delete(id);
        }
    }
}
