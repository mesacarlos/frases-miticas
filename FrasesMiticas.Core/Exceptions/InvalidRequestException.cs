using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FrasesMiticas.Core.Exceptions
{
    public class InvalidRequestException : FrasesMiticasBaseException
    {
        public InvalidRequestException() : this("Invalid request")
        {
        }


        public InvalidRequestException(string message) : base(400, message)
        {
        }
    }
}
