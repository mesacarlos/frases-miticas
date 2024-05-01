namespace FrasesMiticas.Core.Interfaces.Encryption
{
    public interface IHashingService
    {
        /// <summary>
        /// Calculate hash for a given password.
        /// </summary>
        /// <param name="password">Pssword that hash is wanted for.</param>
        /// <returns>Password hash.</returns>
        public string Hash(string password);

        /// <summary>
        /// Validate if a hash is valid for a given password.
        /// </summary>
        /// <param name="hash">Hash.</param>
        /// <param name="password">Password.</param>
        /// <returns>True if hash is valid, false otherwise.</returns>
        public bool Verify(string hash, string password);
    }
}
