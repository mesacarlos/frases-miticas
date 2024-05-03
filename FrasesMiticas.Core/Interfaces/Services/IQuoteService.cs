using FrasesMiticas.Core.Dtos;
using FrasesMiticas.Core.Dtos.Quotes;
using System.Collections.Generic;

namespace FrasesMiticas.Core.Interfaces.Services
{
    public interface IQuoteService
    {
        /// <summary>
        /// Adds a new quote to the persistence
        /// </summary>
        /// <param name="dto">Quote to add</param>
        /// <returns>The just created entity</returns>
        public QuoteDto Add(QuoteDto dto);

        /// <summary>
        /// Updates a quote
        /// </summary>
        /// <param name="id">Quote identifier.</param>
        /// <param name="dto">Quote to update</param>
        /// <returns>The just created entity</returns>
        public QuoteDto Update(int id, QuoteDto dto);

        /// <summary>
        /// Gets all quotes and perform filter
        /// </summary>
        /// <param name="filter">Filter to apply</param>
        /// <returns>Quotes gotten</returns>
        public PagedResultDto<QuoteDto> GetPaginated(QuoteFilterDto filter);

        /// <summary>
        /// Gets an quote by identifier
        /// </summary>
        /// <param name="id">Identifier of the quote to get</param>
        /// <returns>Quote gotten</returns>
        public QuoteDto Get(int id);

        /// <summary>
        /// Deletes a quote
        /// </summary>
        /// <param name="id">Identifier of the quote to delete.</param>
        void Delete(int id);

        /// <summary>
        /// Add a new comment to a quote.
        /// </summary>
        /// <param name="quoteId">If of the quote.</param>
        /// <param name="dto">Data of the comment.</param>
        /// <returns>Added comment.</returns>
        public QuoteCommentDto AddComment(int quoteId, QuoteCommentDto dto);

        /// <summary>
        /// Updates an existing comment.
        /// </summary>
        /// <param name="quoteId">Quote identifier.</param>
        /// <param name="commentId">Comment identifier.</param>
        /// <param name="dto">Data to update.</param>
        /// <returns>Updated comment.</returns>
        public QuoteCommentDto UpdateComment(int quoteId, int commentId, QuoteCommentDto dto);

        /// <summary>
        /// Deletes a comment.
        /// </summary>
        /// <param name="quoteId">Quote identifier.</param>
        /// <param name="commentId">Comment identifier.</param>
        public void DeleteComment(int quoteId, int commentId);
    }
}
