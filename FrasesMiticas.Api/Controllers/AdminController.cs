using FrasesMiticas.Api.Filters;
using FrasesMiticas.Api.ViewModels.Requests;
using FrasesMiticas.Api.ViewModels.Responses;
using FrasesMiticas.Core.Dtos.AppUsers;
using FrasesMiticas.Core.Interfaces;
using FrasesMiticas.Core.Interfaces.Encryption;
using FrasesMiticas.Core.Interfaces.Services;
using FrasesMiticas.Core.Interfaces.Tokens;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace FrasesMiticas.Api.Controllers
{
    [Route("api/admin")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IAppUserService appUserService;
        private readonly IHashingService hashingService;

        public AdminController(IMapper mapper,
            IAppUserService appUserService,
            IHashingService hashingService)
        {
            this.mapper = mapper;
            this.appUserService = appUserService;
            this.hashingService = hashingService;
        }

        [HttpPost("user")]
        [Authorization(true)]
        public ActionResult<AppUserFullResponse> Create([FromBody] AdminAppUserCreateRequest request)
        {
            var dto = new AppUserDto()
            {
                Username = request.Username,
                Email = request.Email,
                Password = hashingService.Hash(request.Password),
                FullName = request.FullName,
                IsSuperAdmin = request.IsSuperAdmin
            };

            var result = appUserService.Add(dto);
            AppUserFullResponse response = mapper.Map<AppUserFullResponse>(result);
            return StatusCode(StatusCodes.Status201Created, response);
        }

        [HttpPut("user/{id}")]
        [Authorization(true)]
        public ActionResult<AppUserFullResponse> Update([FromRoute] int id, [FromBody] AdminAppUserUpdateRequest request)
        {
            AppUserDto dto = mapper.Map<AppUserDto>(request);

            var result = appUserService.Update(id, dto);

            AppUserFullResponse response = mapper.Map<AppUserFullResponse>(result);
            return Ok(response);
        }

        [HttpGet("user")]
        [Authorization(true)]
        public ActionResult<IEnumerable<AppUserFullResponse>> GetAll()
        {
            IEnumerable<AppUserDto> result = appUserService.Get();
            var response = result.Select(e => mapper.Map<AppUserFullResponse>(e));
            return Ok(response);
        }

        [HttpGet("user/{id}")]
        [Authorization(true)]
        public ActionResult<AppUserFullResponse> GetById([FromRoute] int id)
        {
            AppUserDto dto = appUserService.Get(id);
            AppUserFullResponse response = mapper.Map<AppUserFullResponse>(dto);
            return Ok(response);
        }

        [HttpDelete("user/{id}")]
        [Authorization(true)]
        public ActionResult Delete([FromRoute] int id)
        {
            appUserService.Delete(id);
            return NoContent();
        }
    }
}
