using FrasesMiticas.Core.Exceptions;
using FrasesMiticas.Core.Interfaces;
using FrasesMiticas.Core.Interfaces.Encryption;
using FrasesMiticas.Core.Interfaces.Services;
using FrasesMiticas.Core.Interfaces.Tokens;
using FrasesMiticas.Api.Filters;
using FrasesMiticas.Api.ViewModels.Requests;
using FrasesMiticas.Api.ViewModels.Responses;
using Microsoft.AspNetCore.Mvc;

namespace FrasesMiticas.Api.Controllers
{
    [Route("api")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IAccountService accountService;
        private readonly IHashingService hashingService;
        private readonly IUserToken userToken;

        public AccountController(IMapper mapper,
            IAccountService accountService,
            IHashingService hashingService,
            IUserToken userToken)
        {
            this.mapper = mapper;
            this.accountService = accountService;
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
        public ActionResult ChangePassword([FromBody] ChangePasswordRequest request)
        {
            var succeeded = accountService.ChangePassword(
                userToken.UserId,
                request.Username,
                request.OldPassword,
                request.NewPassword);

            return succeeded
                ? Ok(null)
                : Forbid();
        }
    }
}
