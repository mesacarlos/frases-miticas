using System.Collections.Generic;

namespace FrasesMiticas.Core.Dtos
{
    public record PagedResultDto<T>
    {
        public PagedResultDto(ICollection<T> data, int pageIndex, int pageSize, int totalItems)
        {
            Data = data;
            PageIndex = pageIndex;
            PageSize = pageSize;
            TotalItems = totalItems;
            TotalPages = pageSize <= 0 ? 1 : (totalItems + pageSize - 1) / pageSize;
        }

        public int PageIndex { get; init; }

        public int PageSize { get; init; }

        public int TotalPages { get; init; }

        public int TotalItems { get; init; }

        public ICollection<T> Data { get; init; }
    }
}
