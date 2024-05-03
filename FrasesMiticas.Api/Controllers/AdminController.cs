using FrasesMiticas.Api.Filters;
using FrasesMiticas.Api.ViewModels.Requests;
using FrasesMiticas.Api.ViewModels.Responses;
using FrasesMiticas.Core.Dtos.AppUsers;
using FrasesMiticas.Core.Interfaces;
using FrasesMiticas.Core.Interfaces.Encryption;
using FrasesMiticas.Core.Interfaces.Services;
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
        public ActionResult<AppUserAdminResponse> Create([FromBody] AdminAppUserCreateRequest request)
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
            AppUserAdminResponse response = mapper.Map<AppUserAdminResponse>(result);
            return StatusCode(StatusCodes.Status201Created, response);
        }

        [HttpPut("user/{id}")]
        [Authorization(true)]
        public ActionResult<AppUserAdminResponse> Update([FromRoute] int id, [FromBody] AdminAppUserUpdateRequest request)
        {
            AppUserDto dto = mapper.Map<AppUserDto>(request);

            var result = appUserService.Update(id, dto);

            AppUserAdminResponse response = mapper.Map<AppUserAdminResponse>(result);
            return Ok(response);
        }

        [HttpGet("user")]
        [Authorization(true)]
        public ActionResult<IEnumerable<AppUserAdminResponse>> GetAll()
        {
            IEnumerable<AppUserDto> result = appUserService.Get();
            var response = result.Select(e => mapper.Map<AppUserAdminResponse>(e));
            return Ok(response);
        }

        [HttpGet("user/{id}")]
        [Authorization(true)]
        public ActionResult<AppUserAdminResponse> GetById([FromRoute] int id)
        {
            AppUserDto dto = appUserService.Get(id);
            AppUserAdminResponse response = mapper.Map<AppUserAdminResponse>(dto);
            return Ok(response);
        }

        [HttpDelete("user/{id}")]
        [Authorization(true)]
        public ActionResult Delete([FromRoute] int id)
        {
            appUserService.Delete(id);
            return Ok(null);
        }
    }
}
