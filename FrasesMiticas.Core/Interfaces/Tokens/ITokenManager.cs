namespace FrasesMiticas.Core.Interfaces.Tokens
{
    public interface ITokenManager
    {
        /// <summary>
        /// Generate a token
        /// </summary>
        /// <param name="userId">User Id.</param>
        /// <param name="username">Username of the user</param>
        /// <param name="isSuperUser">Is super user.</param>
        /// <returns>Generated Token</returns>
        public IUserToken GenerateUserToken(int userId, string username, bool isSuperUser);

        /// <summary>
        /// Check if a Token is valid
        /// </summary>
        /// <param name="token">Token to check</param>
        /// <returns>True if token is valid. False otherwise</returns>
        public bool Validate(string token);
    }
}
