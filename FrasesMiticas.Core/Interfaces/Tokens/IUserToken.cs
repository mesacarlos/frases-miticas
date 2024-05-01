namespace FrasesMiticas.Core.Interfaces.Tokens
{
    public interface IUserToken : IToken
    {
        public int UserId { get; }

        public string Username { get; }

        public bool SuperUser { get; }
    }
}
