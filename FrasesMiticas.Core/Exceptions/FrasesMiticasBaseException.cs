using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FrasesMiticas.Core.Exceptions
{
    public abstract class FrasesMiticasBaseException : Exception
    {
        public int StatusCode { get; set; }
        public FrasesMiticasBaseException(int statusCode, string message) : base($"{message} ({statusCode})")
        {
            this.StatusCode = statusCode;
        }
    }
}
