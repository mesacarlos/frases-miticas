using FrasesMiticas.Core.Aggregates.AppUsers;
using FrasesMiticas.Core.Dtos.AppUsers;
using System.Collections.Generic;

namespace FrasesMiticas.Core.Interfaces.Repositories
{
    public interface IAppUserRepository
    {
        /// <summary>
        /// Adds a new user
        /// </summary>
        /// <param name="user">User data.</param>
        /// <returns>Added user.</returns>
        public void Add(AppUser user);

        /// <summary>
        /// Updates an user.
        /// </summary>
        /// <param name="user">User data.</param>
        /// <returns>User data after update</returns>
        public void Update(AppUser user);

        /// <summary>
        /// Gets all users.
        /// </summary>
        /// <returns>Users gotten.</returns>
        public ICollection<AppUser> Get();

        /// <summary>
        /// Gets an user by identifier.
        /// </summary>
        /// <param name="id">ID of the user to get.</param>
        /// <returns>User gotten.</returns>
        public AppUser Get(int id);

        /// <summary>
        /// Gets an user by its username.
        /// </summary>
        /// <param name="username">Username of the user to get.</param>
        /// <returns>User gotten</returns>
        public AppUser GetByUsername(string username);

        /// <summary>
        /// Deletes an user.
        /// </summary>
        /// <param name="id">Identifier of the user to delete.</param>
        void Delete(int id);
    }
}
