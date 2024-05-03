using FrasesMiticas.Core.Interfaces;
using FrasesMiticas.Core.Interfaces.Configuration;
using FrasesMiticas.Core.Interfaces.Encryption;
using FrasesMiticas.Core.Interfaces.Repositories;
using FrasesMiticas.Core.Interfaces.Services;
using FrasesMiticas.Core.Interfaces.Tokens;
using FrasesMiticas.Core.Services;
using FrasesMiticas.Infrastructure;
using FrasesMiticas.Infrastructure.Authentication.Encryption;
using FrasesMiticas.Infrastructure.Authentication.Tokens;
using FrasesMiticas.Infrastructure.Data;
using FrasesMiticas.Infrastructure.Data.Repositories;
using FrasesMiticas.Api.Authentication;
using FrasesMiticas.Api.Filters;
using FrasesMiticas.Api.ViewModels.Responses;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using System.Reflection;


namespace FrasesMiticas.Api.Extensions
{
    public static class IServiceCollectionExtensions
    {
        public static void AddApplicationDependencies(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddRouting(options => options.LowercaseUrls = true);

            services.AddDbContext(configuration);

            services.AddTransient<Core.Interfaces.ILogger, Logger>();
            services.AddScoped<IAppConfiguration, AppConfiguration>();

            services.AddMapper();

            services.AddRepositories();
            services.AddBusinessServices();

            services.AddHttpContextAccessor();
        }


        private static void AddDbContext(this IServiceCollection services, IConfiguration configuration)
        {
            string connectionString = configuration.GetConnectionString("DBConnection");

            services.AddDbContext<FrasesMiticasContext>(options => options.UseSqlite(connectionString));
        }


        private static void AddRepositories(this IServiceCollection services)
        {
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

            services.AddScoped<IAppUserRepository, AppUserRepository>();
            services.AddScoped<IQuoteRepository, QuoteRepository>();
        }


        private static void AddBusinessServices(this IServiceCollection services)
        {
            services.AddScoped<IAppUserService, AppUserService>();
            services.AddScoped<IQuoteService, QuoteService>();

            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<IHashingService, HashingService>();

            services.AddAuthenticationServices();
        }


        private static void AddMapper(this IServiceCollection services)
        {
            services.AddScoped<IMapper, Mapper>();
            services.AddAutoMapper();
        }


        /// <summary>
        /// Adds the services needed for the authentication system to the dependency injection container
        /// </summary>
        /// <param name="services"></param>
        private static void AddAuthenticationServices(this IServiceCollection services)
        {
            services.AddScoped<AuthorizationAttribute>();

            services.AddScoped<ITokenManager, TokenManager>();
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<IUserToken>(serviceProvider => {
                var context = serviceProvider.GetService<IHttpContextAccessor>();
                string token = context.HttpContext.Request.GetBearerToken();

                return new UserToken(token);
            });

            services.AddAuthentication(options => {
                options.DefaultAuthenticateScheme = "forbidScheme";
                options.DefaultForbidScheme = "forbidScheme";
                options.AddScheme<AuthHandler>("forbidScheme", "Handle Forbidden");
            });
        }


        /// <summary>
        /// Adds AutoMapper and the configuration needed to the dependency injection container
        /// </summary>
        /// <param name="services"></param>
        private static void AddAutoMapper(this IServiceCollection services)
        {
            var profilesAssembly = Assembly.GetAssembly(typeof(Mapper));

            services.AddScoped(provider => new AutoMapper.MapperConfiguration(cfg => {
                var profiles = profilesAssembly.GetTypes().Where(x => typeof(AutoMapper.Profile).IsAssignableFrom(x));

                foreach (var profile in profiles)
                    cfg.AddProfile(profile);

                profiles = Assembly.GetExecutingAssembly().GetTypes().Where(x => typeof(AutoMapper.Profile).IsAssignableFrom(x));

                foreach (var profile in profiles)
                    cfg.AddProfile(profile);

            }).CreateMapper());
        }


        /// <summary>
        /// Configures the behaviour of the API
        /// </summary>
        /// <param name="services"></param>
        public static void ConfigureApiBehavior(this IServiceCollection services)
        {
            services.Configure<ApiBehaviorOptions>(options => SetInvalidModelResponseFactory(options));
        }


        /// <summary>
        /// Sets the response factory for invalid model errors
        /// </summary>
        /// <param name="options">Options where the factory will be set</param>
        private static void SetInvalidModelResponseFactory(ApiBehaviorOptions options)
        {
            options.InvalidModelStateResponseFactory = actionContext => {
                Response response = new Response(400, "Invalid parameter");

                return new BadRequestObjectResult(response);
            };
        }
    }
}
