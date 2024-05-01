using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace FrasesMiticas.Core.Interfaces.Repositories
{
    public interface IRepository<TAggregateRoot> where TAggregateRoot : class, IAggregateRoot
    {
        /// <summary>
        /// Gets all entities from the persistence
        /// </summary>
        /// <returns>Entities available</returns>
        IQueryable<TAggregateRoot> Get();

        /// <summary>
        /// Gets an entity from the persistence given its identifier
        /// </summary>
        /// <param name="keyValues">Identifiers of the entity</param>
        /// <returns>Entity found or null</returns>
        TAggregateRoot Get(params object[] keyValues);

        /// <summary>
        /// Performs a query on the repository
        /// </summary>
        /// <param name="include">Children entities to include</param>
        /// <returns>Result of the query</returns>
        IQueryable<TAggregateRoot> Where(Func<IQueryable<TAggregateRoot>, IQueryable<TAggregateRoot>> include = null);

        /// <summary>
        /// Performs a query on the repository
        /// </summary>
        /// <param name="predicate">Query to perform</param>
        /// <param name="include">Children entities to include</param>
        /// <returns>Result of the query</returns>
        IQueryable<TAggregateRoot> Where(Expression<Func<TAggregateRoot, bool>> predicate, Func<IQueryable<TAggregateRoot>, IQueryable<TAggregateRoot>> include = null);

        /// <summary>
        /// Adds a new entity to the persistence
        /// </summary>
        /// <param name="entity">Entity to add</param>
        void Add(TAggregateRoot entity);

        /// <summary>
        /// Adds a set of entities to the persistence
        /// </summary>
        /// <param name="entities">Entities to insert</param>
        void Add(ICollection<TAggregateRoot> entities);

        /// <summary>
        /// Updates an entity
        /// </summary>
        /// <param name="entity">Entity to update</param>
        void Update(TAggregateRoot entity);

        /// <summary>
        /// Updates a set of entities
        /// </summary>
        /// <param name="entities">Entities to update</param>
        void Update(ICollection<TAggregateRoot> entities);

        /// <summary>
        /// Deletes an entity given its identifier
        /// </summary>
        /// <param name="keyValues">Identifiers of the entity</param>
        void Delete(params object[] keyValues);
    }
}
