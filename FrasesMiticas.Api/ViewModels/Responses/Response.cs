namespace FrasesMiticas.Api.ViewModels.Responses
{
    public record Response
    {
        public bool Success { get; init; }
        public string Message { get; init; }

        public Response(int statusCode)
        {
            Success = statusCode >= 200 && statusCode < 300;
        }

        public Response(int statusCode, string message)
        {
            Success = statusCode >= 200 && statusCode < 300;
            Message = message;
        }
    }
}
