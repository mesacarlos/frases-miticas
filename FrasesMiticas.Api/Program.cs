using FrasesMiticas.Api.Extensions;
using FrasesMiticas.Api.Filters;
using FrasesMiticas.Api.Formatters;
using FrasesMiticas.Api.Middlewares;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers(configuration => {
    configuration.Filters.Add(typeof(TransactionActionFilter));
    configuration.Filters.Add(typeof(RequestLoggingFilter));

    var jsonOptions = new JsonSerializerOptions
    {
        PropertyNameCaseInsensitive = true,
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
    };

    configuration.OutputFormatters.Insert(0, new ResponseFormatter(jsonOptions));
});

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v2", new OpenApiInfo { Title = "FrasesMiticas.Api", Version = "v2.2" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please insert JWT with Bearer into field",
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement {
                {
                    new OpenApiSecurityScheme
                    {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                    },
                    new string[] { }
        }
    });
});

builder.Services.AddApplicationDependencies(builder.Configuration);

var app = builder.Build();

app.UseSwagger(c => c.RouteTemplate = "api/swagger/{documentName}/swagger.json");
app.UseSwaggerUI(c => {
    c.SwaggerEndpoint("v2/swagger.json", "FrasesMiticas.Api v2");
    c.RoutePrefix = "api/swagger";
});

app.UseCors(corsPolicyBuilder =>
     corsPolicyBuilder.AllowAnyOrigin()
                      .AllowAnyMethod()
                      .AllowAnyHeader()
);

app.UseHttpsRedirection();

app.UseRouting();

app.UseMiddleware(typeof(ExceptionMiddleware));

app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.Run();