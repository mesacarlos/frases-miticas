using FrasesMiticas.Core.Aggregates.Quotes;
using FrasesMiticas.Core.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace FrasesMiticas.Infrastructure.Data.Repositories
{
    public class QuoteRepository : IQuoteRepository
    {
        private readonly IRepository<Quote> repository;

        public QuoteRepository(IRepository<Quote> repository)
        {
            this.repository = repository;
        }

        public void Add(Quote entity) => repository.Add(entity);

        public void Update(Quote entity) => repository.Update(entity);

        public IEnumerable<Quote> Get() => repository
                                                    .Get()
                                                    .Include(e => e.InvolvedUsers)
                                                    .Include(e => e.Reactions)
                                                    .Include(e => e.Comments)
                                                    .OrderByDescending(e => e.Date);

        public Quote Get(int id) => repository
                                            .Where(e => e.Id == id)
                                            .Include(e => e.InvolvedUsers)
                                            .Include(e => e.Reactions)
                                            .Include(e => e.Comments)
                                                .ThenInclude(e => e.User)
                                            .SingleOrDefault();

        public void Delete(int id) => repository.Delete(id);
    }
}
