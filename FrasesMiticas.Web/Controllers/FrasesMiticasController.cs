using FrasesMiticas.Core.Dtos;
using FrasesMiticas.Core.Dtos.FrasesMiticas;
using FrasesMiticas.Core.Interfaces;
using FrasesMiticas.Core.Interfaces.Services;
using FrasesMiticas.Web.Filters;
using FrasesMiticas.Web.ViewModels.Requests;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FrasesMiticas.Web.Controllers
{
    [Route("api/frases-miticas")]
    [ApiController]
    public class FrasesMiticasController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IFraseMiticaService fraseMiticaService;

        public FrasesMiticasController(IMapper mapper,
                                        IFraseMiticaService fraseMiticaService)
        {
            this.mapper = mapper;
            this.fraseMiticaService = fraseMiticaService;
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
        public ActionResult<FraseMiticaDto> Update([FromRoute] int id, [FromBody] FraseMiticaUpdateRequest request)
        {
            FraseMiticaDto dto = mapper.Map<FraseMiticaDto>(request);
            
            var result = fraseMiticaService.Update(id, dto);
            return Ok(result);
        }

        [HttpGet("")]
        [Authorization]
        public ActionResult<PagedResultDto<FraseMiticaDto>> GetPaginated([FromQuery] FraseMiticaFilterRequest request)
        {
            FraseMiticaFilterDto filterDto = mapper.Map<FraseMiticaFilterDto>(request);

            PagedResultDto<FraseMiticaDto> result = fraseMiticaService.GetPaginated(filterDto);
            return Ok(result);
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
    }
}
