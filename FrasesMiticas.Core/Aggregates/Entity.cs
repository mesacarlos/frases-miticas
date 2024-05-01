namespace FrasesMiticas.Core.Aggregates
{
    public abstract class Entity<TKey>
    {
        public TKey Id { get; set; }
    }
}
