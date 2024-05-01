using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FrasesMiticas.Api.Filters
{
    public class AuthorizationAttribute : TypeFilterAttribute
    {
        public AuthorizationAttribute(bool superUserRequired = false) : base(typeof(AuthenticationFilter))
        {
            Arguments = new object[]{ superUserRequired };
        }

    }
}
