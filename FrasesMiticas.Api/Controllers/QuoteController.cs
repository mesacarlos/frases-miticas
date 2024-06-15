using FrasesMiticas.Core.Dtos;
using FrasesMiticas.Core.Dtos.Quotes;
using FrasesMiticas.Core.Interfaces;
using FrasesMiticas.Core.Interfaces.Services;
using FrasesMiticas.Api.Filters;
using FrasesMiticas.Api.ViewModels.Requests;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FrasesMiticas.Api.ViewModels.Responses;
using System;
using FrasesMiticas.Core.Interfaces.Tokens;
using FrasesMiticas.Core.Exceptions;
using System.Linq;
using FrasesMiticas.Core.Aggregates.Quotes;

namespace FrasesMiticas.Api.Controllers
{
    [Route("api/quote")]
    [ApiController]
    public class QuoteController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IQuoteService quoteService;
        private readonly IUserToken userToken;

        public QuoteController(IMapper mapper,
                                        IQuoteService quoteService,
                                        IUserToken userToken)
        {
            this.mapper = mapper;
            this.quoteService = quoteService;
            this.userToken = userToken;
        }

        [HttpPost()]
        [Authorization]
        public ActionResult<QuoteDto> Create([FromBody] QuoteCreateRequest request)
        {
            QuoteDto dto = mapper.Map<QuoteDto>(request);

            var result = quoteService.Add(dto);
            return StatusCode(StatusCodes.Status201Created, result);
        }

        [HttpPut("{id}")]
        [Authorization(true)]
        public ActionResult<QuoteResponse> Update([FromRoute] int id, [FromBody] QuoteUpdateRequest request)
        {
            QuoteDto dto = mapper.Map<QuoteDto>(request);
            
            var result = quoteService.Update(id, dto);
            return Ok(mapper.Map<QuoteResponse>(result));
        }

        [HttpGet("")]
        [Authorization]
        public ActionResult<PagedResultDto<QuoteWithNumberOfCommentsResponse>> GetPaginated([FromQuery] QuoteFilterRequest request)
        {
            QuoteFilterDto filterDto = mapper.Map<QuoteFilterDto>(request);

            PagedResultDto<QuoteDto> result = quoteService.GetPaginated(filterDto);

            var data = result.Data.Select(e => mapper.Map<QuoteWithNumberOfCommentsResponse>(e)).ToList();

            var response = new PagedResultDto<QuoteWithNumberOfCommentsResponse>(data, result.PageIndex, result.PageSize, result.TotalItems);
            
            return Ok(response);
        }

        [HttpGet("{id}")]
        [Authorization]
        public ActionResult<QuoteResponse> GetById([FromRoute] int id)
        {
            QuoteDto dto = quoteService.Get(id);
            return Ok(mapper.Map<QuoteResponse>(dto));
        }

        [HttpDelete("{id}")]
        [Authorization(true)]
        public ActionResult Delete([FromRoute] int id)
        {
            quoteService.Delete(id);
            return Ok(null);
        }

        [HttpPost("{quoteId}/comment")]
        [Authorization]
        public ActionResult<QuoteCommentDto> CreateComment([FromRoute] int quoteId, [FromBody] QuoteCommentCreateRequest request)
        {
            QuoteCommentDto dto = new QuoteCommentDto()
            {
                UserId = userToken.UserId,
                QuoteId = quoteId,
                Date = DateTime.UtcNow,
                Text = request.Text
            };

            var result = quoteService.AddComment(quoteId, dto);
            return StatusCode(StatusCodes.Status201Created, result);
        }

        [HttpPut("{quoteId}/comment/{id}")]
        [Authorization]
        public ActionResult<QuoteCommentDto> UpdateComment([FromRoute] int quoteId, [FromRoute] int id, [FromBody] QuoteCommentUpdateRequest request)
        {
            var commentDto = new QuoteCommentDto()
            {
                Text = request.Text
            };

            var result = quoteService.UpdateComment(quoteId, id, commentDto);

            if (result.UserId != userToken.UserId && !userToken.SuperUser)
            {
                // Throwing a exception here will rollback transaction.
                throw new ForbiddenException("Not enough priovileges to perform this action.");
            }

            return Ok(result);
        }

        [HttpDelete("{quoteId}/comment/{id}")]
        [Authorization]
        public ActionResult DeleteComment([FromRoute] int quoteId, [FromRoute] int id)
        {
            var quote = quoteService.Get(quoteId);
            var comment = quote?.Comments.FirstOrDefault(e => e.Id == id);

            if (comment == null)
                throw new EntityNotFoundException($"The requested comment could not be found.");

            if (comment.UserId != userToken.UserId && !userToken.SuperUser)
            {
                // Throwing a exception here will rollback transaction.
                throw new ForbiddenException("Not enough priovileges to perform this action.");
            }

            quoteService.DeleteComment(quoteId, id);
            return Ok(null);
        }

        [HttpPost("{quoteId}/reaction")]
        [Authorization]
        public ActionResult<QuoteReactionDto> CreateReaction([FromRoute] int quoteId, [FromBody] QuoteReactionCreateRequest request)
        {
            QuoteReactionDto dto = new QuoteReactionDto()
            {
                UserId = userToken.UserId,
                QuoteId = quoteId,
                Type = (ReactionType)request.Type
            };

            var result = quoteService.AddReaction(quoteId, dto);
            return StatusCode(StatusCodes.Status201Created, result);
        }

        [HttpDelete("{quoteId}/reaction")]
        [Authorization]
        public ActionResult DeleteReaction([FromRoute] int quoteId, [FromQuery] int type)
        {
            var typeEnum = (ReactionType)type;

            quoteService.DeleteReaction(quoteId, userToken.UserId, typeEnum);
            return Ok(null);
        }
    }
}
