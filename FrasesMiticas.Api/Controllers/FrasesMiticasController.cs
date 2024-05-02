using FrasesMiticas.Core.Dtos;
using FrasesMiticas.Core.Dtos.FrasesMiticas;
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

namespace FrasesMiticas.Api.Controllers
{
    [Route("api/frases-miticas")]
    [ApiController]
    public class FrasesMiticasController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IFraseMiticaService fraseMiticaService;
        private readonly IUserToken userToken;

        public FrasesMiticasController(IMapper mapper,
                                        IFraseMiticaService fraseMiticaService,
                                        IUserToken userToken)
        {
            this.mapper = mapper;
            this.fraseMiticaService = fraseMiticaService;
            this.userToken = userToken;
        }

        [HttpPost()]
        [Authorization]
        public ActionResult<FraseMiticaDto> Create([FromBody] FraseMiticaCreateRequest request)
        {
            FraseMiticaDto dto = mapper.Map<FraseMiticaDto>(request);

            var result = fraseMiticaService.Add(dto);
            return StatusCode(StatusCodes.Status201Created, result);
        }

        [HttpPut("{id}")]
        [Authorization(true)]
        public ActionResult<FraseMiticaResponse> Update([FromRoute] int id, [FromBody] FraseMiticaUpdateRequest request)
        {
            FraseMiticaDto dto = mapper.Map<FraseMiticaDto>(request);
            
            var result = fraseMiticaService.Update(id, dto);
            return Ok(mapper.Map<FraseMiticaResponse>(result));
        }

        [HttpGet("")]
        [Authorization]
        public ActionResult<PagedResultDto<FraseMiticaResponse>> GetPaginated([FromQuery] FraseMiticaFilterRequest request)
        {
            FraseMiticaFilterDto filterDto = mapper.Map<FraseMiticaFilterDto>(request);

            PagedResultDto<FraseMiticaDto> result = fraseMiticaService.GetPaginated(filterDto);

            var data = result.Data.Select(e => mapper.Map<FraseMiticaResponse>(e)).ToList();

            var response = new PagedResultDto<FraseMiticaResponse>(data, result.PageIndex, result.PageSize, result.TotalItems);
            
            return Ok(response);
        }

        [HttpGet("{id}")]
        [Authorization]
        public ActionResult<FraseMiticaDto> GetById([FromRoute] int id)
        {
            FraseMiticaDto dto = fraseMiticaService.Get(id);
            return Ok(dto);
        }

        [HttpDelete("{id}")]
        [Authorization(true)]
        public ActionResult Delete([FromRoute] int id)
        {
            fraseMiticaService.Delete(id);
            return NoContent();
        }

        [HttpPost("{fraseMiticaId}/comment")]
        [Authorization]
        public ActionResult<CommentDto> CreateComment([FromRoute] int fraseMiticaId, [FromBody] CommentCreateRequest request)
        {
            CommentDto dto = new CommentDto()
            {
                UserId = userToken.UserId,
                PhraseId = fraseMiticaId,
                Date = DateTime.Now,
                Text = request.Text
            };

            var result = fraseMiticaService.AddComment(fraseMiticaId, dto);
            return StatusCode(StatusCodes.Status201Created, result);
        }

        [HttpPut("{fraseMiticaId}/comment/{id}")]
        [Authorization]
        public ActionResult<CommentDto> UpdateComment([FromRoute] int fraseMiticaId, [FromRoute] int id, [FromBody] CommentUpdateRequest request)
        {
            var commentDto = new CommentDto()
            {
                Text = request.Text
            };

            var result = fraseMiticaService.UpdateComment(fraseMiticaId, id, commentDto);

            if (result.UserId != userToken.UserId && !userToken.SuperUser)
            {
                // Throwing a exception here will rollback transaction.
                throw new ForbiddenException("Not enough priovileges to perform this action.");
            }

            return Ok(result);
        }

        [HttpDelete("{fraseMiticaId}/comment/{id}")]
        [Authorization]
        public ActionResult DeleteComment([FromRoute] int fraseMiticaId, [FromRoute] int id)
        {
            var fraseMitica = fraseMiticaService.Get(fraseMiticaId);
            var comment = fraseMitica?.Comments.FirstOrDefault(e => e.Id == id);

            if (comment == null)
                throw new EntityNotFoundException($"The requested comment could not be found.");

            if (comment.UserId != userToken.UserId && !userToken.SuperUser)
            {
                // Throwing a exception here will rollback transaction.
                throw new ForbiddenException("Not enough priovileges to perform this action.");
            }

            fraseMiticaService.DeleteComment(fraseMiticaId, id);
            return NoContent();
        }
    }
}
