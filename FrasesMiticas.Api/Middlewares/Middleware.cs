using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FrasesMiticas.Api.Middlewares
{
    public abstract class Middleware : IMiddleware
    {
        protected readonly RequestDelegate next;


        public Middleware(RequestDelegate next)
        {
            this.next = next;
        }


        public abstract Task Invoke(HttpContext context);
    }
}
