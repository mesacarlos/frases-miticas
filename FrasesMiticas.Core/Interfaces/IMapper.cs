namespace FrasesMiticas.Core.Interfaces
{
    public interface IMapper
    {
        /// <summary>
        /// Maps an instance of a class into another
        /// </summary>
        /// <typeparam name="TDestination"></typeparam>
        /// <param name="source">Instance to map</param>
        /// <returns>Mapped instance</returns>
        public TDestination Map<TDestination>(object source);
    }
}
