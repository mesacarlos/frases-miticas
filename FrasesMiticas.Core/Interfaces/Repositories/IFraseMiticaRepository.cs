using FrasesMiticas.Core.Aggregates.FrasesMiticas;
using System.Collections.Generic;

namespace FrasesMiticas.Core.Interfaces.Repositories
{
    public interface IFraseMiticaRepository
    {
        /// <summary>
        /// Adds a new FraseMitica
        /// </summary>
        /// <param name="fraseMitica">Frase mitica data.</param>
        /// <returns>FraseMitica added.</returns>
        public void Add(FraseMitica fraseMitica);

        /// <summary>
        /// Updates an FraseMitica by ID
        /// </summary>
        /// <param name="fraseMitica">Frase mitica data.</param>
        /// <returns>FraseMitica after update</returns>
        public void Update(FraseMitica fraseMitica);

        /// <summary>
        /// Gets all FraseMiticas
        /// </summary>
        /// <returns>FraseMiticas gotten</returns>
        public IEnumerable<FraseMitica> Get();

        /// <summary>
        /// Gets an FraseMitica by ID
        /// </summary>
        /// <param name="id">ID of the FraseMitica to get</param>
        /// <returns>FraseMitica gotten</returns>
        public FraseMitica Get(int id);

        /// <summary>
        /// Deletes a FraseMitica
        /// </summary>
        /// <param name="id">Identifier of the FraseMitica to delete.</param>
        void Delete(int id);
    }
}
