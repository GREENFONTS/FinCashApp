using BankApis.Model.DbModels;
using BankApis.Model.RequestModels;

namespace Bank_Apis.Services.Users
{
    public interface IUserAuthenticationInterface
    {
        public Task<User> CreateUserAsync(User user);

        public IEnumerable<User> GetUsers();

        public Task<User> GetUser(string Id);

        public Task<User> UpdateUser(string Id, User user);

        public Task<User> GetUserViaEmail(string email);

        public string[] GetToken(string email, string Id);

        public User VerifyToken(string token);
        public Task<ServiceKeys> AddAccountKeys(ServiceKeys serviceKeys);

        public string GetAccountKey(string Id);

        public Task<ServiceKeys> UpdateAccountKeys(ServiceKeys serviceKeys);

        public Task<User> ChangePassword(ChangePasswordModel data);

    }
}
