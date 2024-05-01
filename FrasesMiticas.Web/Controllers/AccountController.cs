using FrasesMiticas.Core.Dtos.AppUsers;
using FrasesMiticas.Core.Exceptions;
using FrasesMiticas.Core.Interfaces;
using FrasesMiticas.Core.Interfaces.Encryption;
using FrasesMiticas.Core.Interfaces.Services;
using FrasesMiticas.Core.Interfaces.Tokens;
using FrasesMiticas.Api.Filters;
using FrasesMiticas.Api.ViewModels.Requests;
using FrasesMiticas.Api.ViewModels.Responses;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace FrasesMiticas.Api.Controllers
{
    [Route("api")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IAccountService accountService;
        private readonly IAppUserService appUserService;
        private readonly IHashingService hashingService;
        private readonly IUserToken userToken;

        public AccountController(IMapper mapper,
            IAccountService accountService,
            IAppUserService appUserService,
            IHashingService hashingService,
            IUserToken userToken)
        {
            this.mapper = mapper;
            this.accountService = accountService;
            this.appUserService = appUserService;
            this.hashingService = hashingService;
            this.userToken = userToken;
        }

        [HttpPost("account/login")]
        public ActionResult<LoginResponse> Login([FromBody] LoginRequest request)
        {
            IUserToken token = accountService.SignIn(request.Username, request.Password);

            if (token == default)
                throw new UnauthorizedException("Invalid user or password");

            var response = mapper.Map<LoginResponse>(token);
            return Ok(response);
        }

        [HttpPost("account/change-password")]
        [Authorization]
        public ActionResult<LoginResponse> Login([FromBody] ChangePasswordRequest request)
        {
            var succeeded = accountService.ChangePassword(
                userToken.UserId,
                request.Username,
                request.OldPassword,
                request.NewPassword);

            return succeeded
                ? Ok()
                : Forbid();
        }

        [HttpPost("user")]
        [Authorization(true)]
        public ActionResult<AppUserResponse> Create([FromBody] AppUserCreateRequest request)
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
            AppUserResponse response = mapper.Map<AppUserResponse>(result);
            return StatusCode(StatusCodes.Status201Created, response);
        }

        [HttpPut("user/{id}")]
        [Authorization(true)]
        public ActionResult<AppUserResponse> Update([FromRoute] int id, [FromBody] AppUserUpdateRequest request)
        {
            AppUserDto dto = mapper.Map<AppUserDto>(request);

            var result = appUserService.Update(id, dto);

            AppUserResponse response = mapper.Map<AppUserResponse>(result);
            return Ok(response);
        }

        [HttpGet("user")]
        [Authorization(true)]
        public ActionResult<IEnumerable<AppUserResponse>> GetAll()
        {
            IEnumerable<AppUserDto> result = appUserService.Get();
            var response = result.Select(e => mapper.Map<AppUserResponse>(e));
            return Ok(response);
        }

        [HttpGet("user/{id}")]
        [Authorization(true)]
        public ActionResult<AppUserResponse> GetById([FromRoute] int id)
        {
            AppUserDto dto = appUserService.Get(id);
            AppUserResponse response = mapper.Map<AppUserResponse>(dto);
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
