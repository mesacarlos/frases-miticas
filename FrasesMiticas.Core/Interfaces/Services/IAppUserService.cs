using System.Collections.Generic;
using FrasesMiticas.Core.Dtos.AppUsers;

namespace FrasesMiticas.Core.Interfaces.Services
{
    public interface IAppUserService
    {
        /// <summary>
        /// Adds a new user to the persistence.
        /// </summary>
        /// <param name="dto">User to add.</param>
        /// <returns>The just created entity</returns>
        public AppUserDto Add(AppUserDto dto);

        /// <summary>
        /// Updates an user.
        /// </summary>
        /// <param name="id">User identifier.</param>
        /// <param name="dto">User to update.</param>
        /// <returns>The just created entity</returns>
        public AppUserDto Update(int id, AppUserDto dto);

        /// <summary>
        /// Gets all users.
        /// </summary>
        /// <returns>Users gotten.</returns>
        public ICollection<AppUserDto> Get();

        /// <summary>
        /// Gets an user by its identifier.
        /// </summary>
        /// <param name="id">Identifier of the user to get.</param>
        /// <returns>User gotten</returns>
        public AppUserDto Get(int id);

        /// <summary>
        /// Deletes an user.
        /// </summary>
        /// <param name="id">Identifier of the user to delete.</param>
        void Delete(int id);
    }
}
