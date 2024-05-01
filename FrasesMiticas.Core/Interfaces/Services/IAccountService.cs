using FrasesMiticas.Core.Interfaces.Tokens;

namespace FrasesMiticas.Core.Interfaces.Services
{
    public interface IAccountService
    {
        /// <summary>
        /// Do the Log In process
        /// </summary>
        /// <param name="username">User name</param>
        /// <param name="password">User password</param>
        /// <returns>Login result</returns>
        public IUserToken SignIn(string username, string password);

        /// <summary>
        /// Change own user password
        /// </summary>
        /// <param name="username">User name</param>
        /// <param name="currentPassword">Current user password</param>
        /// /// <param name="newPassword">New user password</param>
        /// <returns>Change password result</returns>
        public bool ChangePassword(int userId, string username, string currentPassword, string newPassword);
    }
}
