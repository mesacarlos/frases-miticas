using FrasesMiticas.Core.Exceptions;
using FrasesMiticas.Core.Interfaces;
using FrasesMiticas.Core.Interfaces.Encryption;
using FrasesMiticas.Core.Interfaces.Repositories;
using FrasesMiticas.Core.Interfaces.Services;
using FrasesMiticas.Core.Interfaces.Tokens;

namespace FrasesMiticas.Core.Services
{
    public class AccountService : IAccountService
    {
        private readonly ITokenManager tokenManager;
        private readonly IAppUserRepository appUserRepository;
        private readonly IHashingService hashingService;
        private readonly ILogger logger;

        public AccountService(ITokenManager tokenManager,
            IAppUserRepository appUserRepository,
            IHashingService hashingService,
            ILogger logger)
        {
            this.tokenManager = tokenManager;
            this.appUserRepository = appUserRepository;
            this.hashingService = hashingService;
            this.logger = logger;
        }

        public IUserToken SignIn(string username, string password)
        {
            logger.Information($"Logging In user {username}.");

            var user = appUserRepository.GetByUsername(username);

            if (user == null)
            {
                logger.Information($"User {username} not found.");
                throw new UnauthorizedException("Invalid user or password");
            }

            bool isPaswordValid = hashingService.Verify(user.Password, password);

            if (!isPaswordValid)
            {
                logger.Information($"User {username} tried to log in with invalid password.");
                throw new UnauthorizedException("Invalid user or password");
            }

            logger.Information($"Generating token for valid user {username}.");
            return tokenManager.GenerateUserToken(user.Id, user.Username, user.IsSuperAdmin);
        }

        public bool ChangePassword(int userId, string username, string currentPassword, string newPassword)
        {
            logger.Information($"Changing password for user {username}.");

            var user = appUserRepository.Get(userId);

            if (user == null || user.Username != username)
            {
                return false;
            }

            bool isPaswordValid = hashingService.Verify(user.Password, currentPassword);

            if (!isPaswordValid)
            {
                logger.Information($"User {username} tried to change password with invalid password.");
                return false;
            }

            logger.Information($"Changing password for user {username}.");

            user.Password = hashingService.Hash(newPassword);
            appUserRepository.Update(user);

            return true;
        }
    }
}
