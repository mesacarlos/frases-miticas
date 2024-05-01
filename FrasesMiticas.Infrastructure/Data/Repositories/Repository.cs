using FrasesMiticas.Core.Exceptions;
using FrasesMiticas.Core.Interfaces;
using FrasesMiticas.Core.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace FrasesMiticas.Infrastructure.Data.Repositories
{
    public class Repository<TAggregateRoot> : IRepository<TAggregateRoot> where TAggregateRoot : class, IAggregateRoot
    {
        private readonly ILogger logger;
        private readonly DbContext context;

        private readonly DbSet<TAggregateRoot> entitySet;


        public Repository(ILogger logger, FrasesMiticasContext context)
        {
            this.logger = logger;
            this.context = context;

            entitySet = context.Set<TAggregateRoot>();
        }


        public IQueryable<TAggregateRoot> Get() => entitySet.AsNoTracking();


        public TAggregateRoot Get(params object[] keyValues)
        {
            var entity = entitySet.Find(keyValues);

            if(entity == null)
                throw new EntityNotFoundException($"Entity with ID {string.Join(", ", keyValues)} was not found");

            context.Entry(entity).State = EntityState.Detached;

            return entity;
        }


        public IQueryable<TAggregateRoot> Where(Func<IQueryable<TAggregateRoot>, IQueryable<TAggregateRoot>> include = null)
        {
            var query = context.Set<TAggregateRoot>().AsQueryable();

            if (include != null)
                query = include(query);

            return query;
        }


        public IQueryable<TAggregateRoot> Where(Expression<Func<TAggregateRoot, bool>> predicate, Func<IQueryable<TAggregateRoot>, IQueryable<TAggregateRoot>> include = null)
        {
            var query = context.Set<TAggregateRoot>().Where(predicate);

            if (include != null)
                query = include(query);

            return query;
        }


        public void Add(TAggregateRoot entity)
        {
            context.Set<TAggregateRoot>().Add(entity);

            context.SaveChanges();
        }


        public void Add(ICollection<TAggregateRoot> entities)
        {
            if (entities.Count > 0)
            {
                context.Set<TAggregateRoot>().AddRange(entities);

                context.SaveChanges();
            }
        }


        public void Update(TAggregateRoot entity)
        {
            if (entity != default)
            {
                try
                {
                    context.Entry(entity).State = EntityState.Modified;

                    context.Set<TAggregateRoot>().Update(entity);
                    context.SaveChanges();
                }

                catch (DbUpdateConcurrencyException ex)
                {
                    logger.Error(ex);
                    throw;
                }
            }
        }


        public void Update(ICollection<TAggregateRoot> entities)
        {
            if (entities.Count > 0)
            {
                foreach (var entity in entities)
                    context.Entry(entity).State = EntityState.Modified;

                context.Set<TAggregateRoot>().UpdateRange(entities);

                context.SaveChanges();
            }
        }


        public void Delete(params object[] keyValues)
        {
            var model = Get(keyValues);

            entitySet.Remove(model);

            context.SaveChanges();
        }
    }
}
