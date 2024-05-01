using FrasesMiticas.Core.Exceptions;
using FrasesMiticas.Web.ViewModels.Responses;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace FrasesMiticas.Web.Formatters
{
    public class ResponseFormatter : SystemTextJsonOutputFormatter
    {
        public ResponseFormatter(JsonSerializerOptions jsonSerializerOptions) : base(jsonSerializerOptions)
        {
        }


        public override bool CanWriteResult(OutputFormatterCanWriteContext context)
        {
            return base.CanWriteResult(context);
        }


        protected override bool CanWriteType(Type type)
        {
            return base.CanWriteType(type);
        }


        public async override Task WriteAsync(OutputFormatterWriteContext context)
        {
            if (context.Object == null)
            {
                var response = new DataResponse(context.HttpContext.Response.StatusCode, null);
                await context.HttpContext.Response.WriteAsJsonAsync(response);
            }
            else if (context.Object != null && context.ObjectType != typeof(Response))
            {
                if (context.ObjectType == typeof(ValidationProblemDetails))
                {
                    ValidationProblemDetails validationProblemDetails = (ValidationProblemDetails)context.Object;
                    throw new InvalidRequestException(validationProblemDetails.Title + ":\n" + string.Join("\n", validationProblemDetails.Errors.Select(e => e.Key + ": " + string.Join("\n", e.Value))));
                }
                else if (context.ObjectType == typeof(ProblemDetails))
                {
                    ProblemDetails validationProblemDetails = (ProblemDetails)context.Object;
                    throw new InvalidRequestException(validationProblemDetails.Title);
                }

                var response = new DataResponse(context.HttpContext.Response.StatusCode, context.Object);

                await context.HttpContext.Response.WriteAsJsonAsync(response);

            }
            else
                await base.WriteAsync(context);
        }
    }
}
