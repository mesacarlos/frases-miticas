using FrasesMiticas.Core.Aggregates.AppUsers;
using FrasesMiticas.Core.Interfaces.Repositories;
using System.Collections.Generic;
using System.Linq;

namespace FrasesMiticas.Infrastructure.Data.Repositories
{
    public class AppUserRepository : IAppUserRepository
    {
        private readonly IRepository<AppUser> repository;

        public AppUserRepository(IRepository<AppUser> repository)
        {
            this.repository = repository;
        }

        public void Add(AppUser entity) => repository.Add(entity);

        public void Update(AppUser entity) => repository.Update(entity);

        public ICollection<AppUser> Get() => repository.Get().ToList();

        public AppUser Get(int id) => repository.Where(e => e.Id == id).SingleOrDefault();

        public AppUser GetByUsername(string username) => repository.Where(e => e.Username == username).FirstOrDefault();

        public ICollection<AppUser> GetByIds(List<int> ids) => repository.Where(e => ids.Contains(e.Id)).ToList();

        public void Delete(int id) => repository.Delete(id);
    }
}
