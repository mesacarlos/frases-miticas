namespace FrasesMiticas.Core.Dtos.Configuration
{
    public record TokenConfigurationDto
    {
        public string SecretKey { get; init; }
        public string Issuer { get; init; }
        public int ExpiresIn { get; init; }
    }
}
