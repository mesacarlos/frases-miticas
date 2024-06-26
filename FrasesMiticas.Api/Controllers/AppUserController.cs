﻿using FrasesMiticas.Api.Filters;
using FrasesMiticas.Api.ViewModels.Responses;
using FrasesMiticas.Core.Dtos.AppUsers;
using FrasesMiticas.Core.Interfaces;
using FrasesMiticas.Core.Interfaces.Encryption;
using FrasesMiticas.Core.Interfaces.Services;
using FrasesMiticas.Core.Interfaces.Tokens;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace FrasesMiticas.Api.Controllers
{
    [Route("api")]
    [ApiController]
    public class AppUserController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IAppUserService appUserService;
        private readonly IHashingService hashingService;
        private readonly IUserToken userToken;

        public AppUserController(IMapper mapper,
            IAppUserService appUserService,
            IHashingService hashingService,
            IUserToken userToken)
        {
            this.mapper = mapper;
            this.appUserService = appUserService;
            this.hashingService = hashingService;
            this.userToken = userToken;
        }

        [HttpGet("user")]
        [Authorization]
        public ActionResult<IEnumerable<AppUserAdminResponse>> GetAll()
        {
            IEnumerable<AppUserDto> result = appUserService.Get();
            var response = result.Select(e => mapper.Map<AppUserSummaryDto>(e));
            return Ok(response);
        }

        [HttpGet("user/self")]
        [Authorization]
        public ActionResult<AppUserAdminResponse> GetSelfUser()
        {
            AppUserDto dto = appUserService.Get(userToken.UserId);
            AppUserAdminResponse response = mapper.Map<AppUserAdminResponse>(dto);
            return Ok(response);
        }
    }
}
