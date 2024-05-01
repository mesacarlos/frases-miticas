using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FrasesMiticas.Web.ViewModels.Responses
{
    public record DataResponse : Response
    {
        public object Data { get; init; }


        public DataResponse(int statusCode, object data) : base(statusCode)
        {
            Data = data;
        }


        public DataResponse(int statusCode, string message, object data) : base(statusCode, message)
        {
            Data = data;
        }
    }
}
