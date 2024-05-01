using FrasesMiticas.Core.Dtos;
using FrasesMiticas.Core.Dtos.FrasesMiticas;
using System.Collections.Generic;

namespace FrasesMiticas.Core.Interfaces.Services
{
    public interface IFraseMiticaService
    {
        /// <summary>
        /// Adds a new FraseMitica to the persistence
        /// </summary>
        /// <param name="dto">FraseMitica to add</param>
        /// <returns>The just created entity</returns>
        public FraseMiticaDto Add(FraseMiticaDto dto);

        /// <summary>
        /// Updates a FraseMitica
        /// </summary>
        /// <param name="id">FraseMitica identifier.</param>
        /// <param name="dto">FraseMitica to update</param>
        /// <returns>The just created entity</returns>
        public FraseMiticaDto Update(int id, FraseMiticaDto dto);

        /// <summary>
        /// Gets all FrasesMiticas and perform filter
        /// </summary>
        /// <param name="filter">Filter to apply</param>
        /// <returns>FrasesMiticas gotten</returns>
        public PagedResultDto<FraseMiticaDto> GetPaginated(FraseMiticaFilterDto filter);

        /// <summary>
        /// Gets an FraseMitica by ID
        /// </summary>
        /// <param name="id">ID of the FraseMitica to get</param>
        /// <returns>FraseMitica gotten</returns>
        public FraseMiticaDto Get(int id);

        /// <summary>
        /// Deletes a FraseMitica
        /// </summary>
        /// <param name="id">Identifier of the FraseMitica to delete.</param>
        void Delete(int id);
    }
}
