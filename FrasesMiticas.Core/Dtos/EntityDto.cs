namespace FrasesMiticas.Core.Dtos
{
    public abstract record EntityDto<TKey>
    {
        public TKey Id { get; init; }
    }
}
