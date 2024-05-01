using FrasesMiticas.Core.Dtos.Configuration;

namespace FrasesMiticas.Core.Interfaces.Configuration
{
    public interface IAppConfiguration
    {
        public TokenConfigurationDto TokenConfiguration { get; }
    }
}
