using FrasesMiticas.Core.Exceptions;
using FrasesMiticas.Core.Interfaces.Tokens;
using Microsoft.AspNetCore.Mvc.Filters;

namespace FrasesMiticas.Web.Filters
{
    public class AuthenticationFilter : IAuthorizationFilter
    {
        private readonly IUserToken userToken;
        private readonly ITokenManager tokenManager;
        private readonly bool requiresSuperUser;

        public AuthenticationFilter(IUserToken userToken, ITokenManager tokenManager, bool requiresSuperUser)
        {
            this.userToken = userToken;
            this.tokenManager = tokenManager;
            this.requiresSuperUser = requiresSuperUser;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            if (!IsUserAuthenticated(userToken))
            {
                throw new UnauthorizedException();
            }
            else if (requiresSuperUser && !userToken.SuperUser)
            {
                throw new ForbiddenException();
            }
        }


        /// <summary>
        /// Check if the user is authenticated. That is, has a valid unexpired token
        /// </summary>
        /// <param name="userToken">User Token</param>
        /// <returns>True if Token is valid. False otherwise</returns>
        private bool IsUserAuthenticated(IUserToken userToken)
        {
            if (userToken?.Token != default)
                return tokenManager.Validate(userToken.Token);

            return false;
        }
    }
}
