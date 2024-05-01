namespace FrasesMiticas.Core.Interfaces.Tokens
{
    public interface IToken 
    {
        public string Token { get; }


        /// <summary>
        /// Get a value of the Token payload
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="key">Key of the value to get</param>
        /// <returns>Value gotten</returns>
        public T GetPayloadValue<T>(string key);
    }
}
