using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FrasesMiticas.Core.Exceptions
{
    public class UnauthorizedException : FrasesMiticasBaseException
    {
        public UnauthorizedException() : this("Unauthorized")
        {
        }


        public UnauthorizedException(string message) : base(401, message)
        {
        }
    }
}
