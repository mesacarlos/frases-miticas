using FrasesMiticas.Core.Interfaces.Tokens;
using System.Collections.Generic;
using System.Text.Json;

namespace FrasesMiticas.Infrastructure.Authentication.Tokens
{
    public class UserToken : IUserToken
    {
        private readonly IToken token;

        public string Token => token.Token;

        public int UserId => int.Parse(GetPayloadValue<string>(nameof(UserId)));

        public string Username => GetPayloadValue<string>(nameof(Username));

        public bool SuperUser => GetPayloadValue<bool>(nameof(SuperUser));

        public UserToken(string token)
        {
            this.token = new JwtToken(token);
        }

        public T GetPayloadValue<T>(string key) => token.GetPayloadValue<T>(key);

        public ICollection<T> GetJsonPayloadValue<T>(string key)
        {
            string jsonValue = token.GetPayloadValue<string>(key);
            return JsonSerializer.Deserialize<ICollection<T>>(jsonValue);
        }
    }
}
