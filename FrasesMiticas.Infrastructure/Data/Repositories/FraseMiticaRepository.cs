using FrasesMiticas.Core.Aggregates.FrasesMiticas;
using FrasesMiticas.Core.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace FrasesMiticas.Infrastructure.Data.Repositories
{
    public class FraseMiticaRepository : IFraseMiticaRepository
    {
        private readonly IRepository<FraseMitica> repository;

        public FraseMiticaRepository(IRepository<FraseMitica> repository)
        {
            this.repository = repository;
        }

        public void Add(FraseMitica entity) => repository.Add(entity);

        public void Update(FraseMitica entity) => repository.Update(entity);

        public IEnumerable<FraseMitica> Get() => repository
                                                    .Get()
                                                    .Include(e => e.InvolvedUsers)
                                                    .OrderByDescending(e => e.Date);

        public FraseMitica Get(int id) => repository
                                            .Where(e => e.Id == id)
                                            .Include(e => e.InvolvedUsers)
                                            .Include(e => e.Comments)
                                                .ThenInclude(e => e.User)
                                            .SingleOrDefault();

        public void Delete(int id) => repository.Delete(id);
    }
}
