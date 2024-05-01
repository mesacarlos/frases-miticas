using FrasesMiticas.Core.Dtos.Configuration;
using FrasesMiticas.Core.Interfaces.Configuration;
using Microsoft.Extensions.Configuration;
using IMsConfiguration = Microsoft.Extensions.Configuration.IConfiguration;

namespace FrasesMiticas.Web
{
    public class AppConfiguration : IAppConfiguration
    {
        private readonly IMsConfiguration configuration;

        public TokenConfigurationDto TokenConfiguration => GetTokenConfiguration();

        public AppConfiguration(IMsConfiguration configuration)
        {
            this.configuration = configuration;
        }

        /// <summary>
        /// Gets the JWT Tokens generation configuration
        /// </summary>
        /// <returns>Tokens configuration</returns>
        private TokenConfigurationDto GetTokenConfiguration()
        {
            return configuration.GetSection("Jwt").Get<TokenConfigurationDto>();
        }

    }
}
