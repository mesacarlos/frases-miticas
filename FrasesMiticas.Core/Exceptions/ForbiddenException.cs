using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FrasesMiticas.Core.Exceptions
{
    public class ForbiddenException : FrasesMiticasBaseException
    {
        public ForbiddenException() : this("403 Forbidden")
        {
        }


        public ForbiddenException(string message) : base(403, message)
        {
        }
    }
}
