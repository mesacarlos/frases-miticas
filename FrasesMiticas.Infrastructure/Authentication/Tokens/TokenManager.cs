using FrasesMiticas.Core.Interfaces.Configuration;
using FrasesMiticas.Core.Interfaces.Tokens;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace FrasesMiticas.Infrastructure.Authentication.Tokens
{
    public class TokenManager : ITokenManager
    {
        private readonly IAppConfiguration configuration;


        public TokenManager(IAppConfiguration configuration)
        {
            this.configuration = configuration;
        }


        public IUserToken GenerateUserToken(int userId, string username, bool isSuperUser)
        {
            var userIdClaim = new Claim(nameof(UserToken.UserId), userId.ToString());
            var usernameClaim = new Claim(nameof(UserToken.Username), username);
            var superUserClaim = new Claim(nameof(UserToken.SuperUser), isSuperUser.ToString(), ClaimValueTypes.Boolean);

            string token = GenerateToken(userIdClaim, usernameClaim, superUserClaim);

            return new UserToken(token);
        }


        /// <summary>
        /// Generate a token for the given claims
        /// </summary>
        /// <param name="claims">Claims to add to the Token</param>
        /// <returns>Generated Token</returns>
        private string GenerateToken(params Claim[] claims)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.Default.GetBytes(configuration.TokenConfiguration.SecretKey));
            var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);

            var claimsIdentity = new ClaimsIdentity(claims);

            var tokenHandler = new JwtSecurityTokenHandler();

            var jwtSecurityToken = tokenHandler.CreateJwtSecurityToken(
                issuer: configuration.TokenConfiguration.Issuer,
                subject: claimsIdentity,
                notBefore: DateTime.UtcNow,
                expires: DateTime.UtcNow.AddMinutes(configuration.TokenConfiguration.ExpiresIn),
                signingCredentials: signingCredentials);

            return tokenHandler.WriteToken(jwtSecurityToken);
        }


        public bool Validate(string token)
        {
            if (string.IsNullOrEmpty(token))
                return false;

            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var validationParameters = GetTokenValidationParameters(configuration.TokenConfiguration.Issuer, configuration.TokenConfiguration.SecretKey);

                tokenHandler.ValidateToken(token, validationParameters, out SecurityToken securityToken);

                return true;
            } catch (SecurityTokenValidationException)
            {
                return false;
            }
        }


        /// <summary>
        /// Obtiene los parámetros de validación de un token
        /// </summary>
        /// <param name="issuer">Emisor del token</param>
        /// <param name="secretKey">Clave secreta utilizada en la firma del token</param>
        /// <returns></returns>
        private TokenValidationParameters GetTokenValidationParameters(string issuer, string secretKey)
        {
            var secretKeyBytes = Encoding.Default.GetBytes(secretKey);
            var securityKey = new SymmetricSecurityKey(secretKeyBytes);

            return new TokenValidationParameters {
                ValidIssuer = issuer,
                ValidateLifetime = true,
                ValidateAudience = false,
                ValidateIssuerSigningKey = true,
                LifetimeValidator = LifetimeValidator,
                IssuerSigningKey = securityKey
            };
        }


        /// <summary>
        /// Comprueba que un token no haya expirado
        /// </summary>
        /// <param name="notBefore">Utilizado internamente por <see cref="TokenValidationParameters.LifetimeValidator"/></param>
        /// <param name="expires">Momento en el que expira el token</param>
        /// <param name="securityToken">Utilizado internamente por <see cref="TokenValidationParameters.LifetimeValidator"/></param>
        /// <param name="validationParameters">Utilizado internamente por <see cref="TokenValidationParameters.LifetimeValidator"/></param>
        /// <returns></returns>
        private bool LifetimeValidator(DateTime? notBefore, DateTime? expires, SecurityToken securityToken, TokenValidationParameters validationParameters)
        {
            if (expires != null && DateTime.UtcNow < expires)
                return true;

            return false;
        }
    }
}
