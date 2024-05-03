using FrasesMiticas.Core.Aggregates.Quotes;
using System.Collections.Generic;

namespace FrasesMiticas.Core.Interfaces.Repositories
{
    public interface IQuoteRepository
    {
        /// <summary>
        /// Adds a new Quote
        /// </summary>
        /// <param name="quote">Frase mitica data.</param>
        /// <returns>Quote added.</returns>
        public void Add(Quote quote);

        /// <summary>
        /// Updates a Quote by ID
        /// </summary>
        /// <param name="quote">Frase mitica data.</param>
        /// <returns>Quote after update</returns>
        public void Update(Quote quote);

        /// <summary>
        /// Gets all quotes
        /// </summary>
        /// <returns>Quote gotten</returns>
        public IEnumerable<Quote> Get();

        /// <summary>
        /// Gets a quote by ID
        /// </summary>
        /// <param name="id">ID of the Quote to get</param>
        /// <returns>Quote gotten</returns>
        public Quote Get(int id);

        /// <summary>
        /// Deletes a Quote
        /// </summary>
        /// <param name="id">Identifier of the Quote to delete.</param>
        void Delete(int id);
    }
}
