using FrasesMiticas.Core.Interfaces;
using FrasesMiticas.Core.Interfaces.Tokens;
using Microsoft.AspNetCore.Mvc.Filters;

namespace FrasesMiticas.Web.Filters
{
    public class RequestLoggingFilter : IActionFilter
    {
        private readonly ILogger logger;
        private readonly IUserToken userToken;

        public RequestLoggingFilter(ILogger logger, IUserToken userToken)
        {
            this.logger = logger;
            this.userToken = userToken;
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            bool isTokenAvailable = userToken.Token != null;

            if (isTokenAvailable)
            {
                logger.Information($"Called {context.HttpContext.Request.Path} by user {userToken.Username}.");
            }
            else
            {
                logger.Information($"Called {context.HttpContext.Request.Path} by an unauthenticated user.");
            }
            
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
            
        }
    }
}
