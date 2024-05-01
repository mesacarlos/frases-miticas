using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FrasesMiticas.Api.Extensions
{
    public static class HttpRequestExtensions
    {
        /// <summary>
        /// Gets the Bearer token from a HTTP Request
        /// </summary>
        /// <param name="request">HTTP Request</param>
        /// <returns>Bearer token, if available</returns>
        public static string GetBearerToken(this HttpRequest request)
        {
            bool hasRequestAuthorizationHeader = request.Headers.TryGetValue("Authorization", out StringValues authorizationValues);

            if (hasRequestAuthorizationHeader)
            {
                return authorizationValues[0].Replace("Bearer", string.Empty)
                                             .Trim();
            }

            return default;
        }
    }
}
