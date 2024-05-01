using FrasesMiticas.Core.Interfaces.Encryption;

namespace FrasesMiticas.Infrastructure.Authentication.Encryption
{
    public class HashingService : IHashingService
    {
        public string Hash(string password) => BCrypt.Net.BCrypt.HashPassword(password);

        public bool Verify(string hash, string password) => BCrypt.Net.BCrypt.Verify(password, hash);
    }
}
