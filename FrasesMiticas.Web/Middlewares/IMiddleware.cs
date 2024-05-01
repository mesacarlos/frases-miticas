using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FrasesMiticas.Web.Middlewares
{
    public interface IMiddleware
    {
        /// <summary>
        /// Method executed when a HTTP Communication is intercepted
        /// </summary>
        /// <param name="context">Context of the communication</param>
        /// <returns></returns>
        Task Invoke(HttpContext context);
    }
}
