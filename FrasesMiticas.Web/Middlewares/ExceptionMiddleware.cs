using FrasesMiticas.Core.Exceptions;
using FrasesMiticas.Core.Interfaces;
using FrasesMiticas.Api.ViewModels.Responses;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace FrasesMiticas.Api.Middlewares
{
    public class ExceptionMiddleware : Middleware
    {
        private readonly ILogger logger;


        public ExceptionMiddleware(RequestDelegate next, ILogger logger) : base(next)
        {
            this.logger = logger;
        }


        public override async Task Invoke(HttpContext context)
        {
            try
            {
                await next(context);
            } catch (Exception ex)
            {
                logger.Fatal(ex);
                await HandleExceptionAsync(context, ex);
            }
        }


        /// <summary>
        /// Handles exceptions bedore returning them to the client
        /// </summary>
        /// <param name="context">Context on wich the exception happened</param>
        /// <param name="exception">Info about the exception</param>
        /// <returns></returns>
        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            int statusCode = StatusCodes.Status500InternalServerError;

            if (exception is FrasesMiticasBaseException)
                statusCode = (exception as FrasesMiticasBaseException).StatusCode;

            Response response;
            if(exception.InnerException == null)
                response = new Response(statusCode, exception.Message);
            else
                response = new Response(statusCode, exception.Message + "\n" + exception.InnerException.Message);

            await SetHttpResponse(statusCode, context.Response, response);
        }


        /// <summary>
        /// Sets a HTTP response given the content of the response and the status code
        /// </summary>
        /// <param name="statusCode">Status code of the HTTP response</param>
        /// <param name="response">HTTP response</param>
        /// <param name="responseContent">Response content</param>
        /// <returns></returns>
        private async Task SetHttpResponse(int statusCode, HttpResponse response, Response responseContent)
        {
            var jsonOptions = new JsonSerializerOptions {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

            var result = JsonSerializer.Serialize(responseContent, jsonOptions);

            response.ContentType = "application/json; charset=utf-8";
            response.StatusCode = statusCode;

            await response.WriteAsync(result);
        }
    }
}
