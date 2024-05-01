using FrasesMiticas.Core.Interfaces.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace FrasesMiticas.Infrastructure.Authentication.Tokens
{
    public class JwtToken : IToken
    {
        public string Token { get; private set; }


        public JwtToken(string token)
        {
            Token = token;
        }


        public T GetPayloadValue<T>(string key)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var actualToken = (JwtSecurityToken)tokenHandler.ReadToken(Token);

            actualToken.Payload.TryGetValue(key, out object result);

            return (T)result;
        }
    }
}
