using Bank_Apis.Model;
using Bank_Apis.Utils;
using BankApis.Model.DbModels;
using BankApis.Model.RequestModels;
using Microsoft.EntityFrameworkCore;


namespace Bank_Apis.Services.Users
{
    public class UserAuthenticationActions : IUserAuthenticationInterface
    {
        private readonly DatabaseContext _dbClient;
        private readonly IConfiguration _configuration;

        public UserAuthenticationActions(IConfiguration iconfiguration, DatabaseContext _client)
        {
            _configuration = iconfiguration;
            _dbClient = _client;

        }

        public IEnumerable<User> GetUsers()
        {
            var users = _dbClient.Users.ToList();
            return users;
        }

        public async Task<User> CreateUserAsync(User user)
        {
            var User = await _dbClient.Users.FirstOrDefaultAsync(x => x.Email == user.Email || x.UserName == user.UserName);
            if(User == null)
            {
                _dbClient.Users.Add(user);
                await _dbClient.SaveChangesAsync();

                return user;
            }
            else
            {
                return null;
            }
            
        }

        public async Task<User> GetUser(string Id)
        {
            var user = await _dbClient.Users.FirstOrDefaultAsync(x => x.Id == Id);         
            return user;
        }

        public async Task<User> GetUserViaEmail(string email)
        {
            var user = await _dbClient.Users.FirstOrDefaultAsync(x => x.Email == email);

            return user;
        }

        
        public string[] GetToken(string email, string Id)
        {
            var classInstance = new GenerateToken(_configuration);

            var token = classInstance.GetToken(email, Id);

            return token;
        }

        public async Task<User> UpdateUser(string Id, User user)
        {
            var currentUser = _dbClient.Users.SingleOrDefault(x => x.Id == Id);
            if (currentUser == null)
            {
                return null;
            }
            else
            {
                user.Password = currentUser.Password;
                user.Email = currentUser.Email;                
                _dbClient.Entry(currentUser).CurrentValues.SetValues(user);
                await _dbClient.SaveChangesAsync();
                currentUser = _dbClient.Users.SingleOrDefault(x => x.Id == Id);
                return currentUser;
            }

        }

        public async Task<ServiceKeys> UpdateAccountKeys(ServiceKeys serviceKeys)
        {
            var checkKeys = await _dbClient.ServiceKeys.FindAsync(serviceKeys.UserId);
            if (checkKeys != null)
            {
                _dbClient.Entry(checkKeys).CurrentValues.SetValues(serviceKeys);
                await _dbClient.SaveChangesAsync();
                return serviceKeys;
            }


            return null;

        }


        public async Task<ServiceKeys> AddAccountKeys(ServiceKeys serviceKeys)
        {
            var checkKeys = await _dbClient.ServiceKeys.FindAsync(serviceKeys.UserId);
            if (checkKeys != null)
            {
                return checkKeys;
            }
            else
            {

                var user = await _dbClient.Users.FindAsync(serviceKeys.UserId);

                if (user == null)
                {
                    return null;
                }
                else
                {

                    _dbClient.ServiceKeys.Add(serviceKeys);
                    await _dbClient.SaveChangesAsync();

                    return serviceKeys;
                }
            }

        }

        public User VerifyToken(string token)
        {
            var classInstance = new VerifyToken(_configuration);

            var res = classInstance.verifyToken(token);

            if (res != null)
            {
                var user = _dbClient.Users.FirstOrDefault((x) => x.Id == res);
                return user;
            }
            return null;
        }

        public string GetAccountKey(string Id)
        {
            var serviceKey = _dbClient.ServiceKeys.Find(Id);
            if(serviceKey == null)
            {
                return null;
            }

            return serviceKey.MonoPrivateKey;
        }

        public async Task<User> ChangePassword(ChangePasswordModel data)
        {
            var user = _dbClient.Users.FirstOrDefault(x => x.Id == data.UserId);
            if(user != null)
            {
                bool checkPassword = PasswordHash.VerifyHash(user.Password, data.OldPassword);
                if (checkPassword)
                {
                    user.Password = PasswordHash.HashPassword(data.NewPassword);
                    await _dbClient.SaveChangesAsync();

                    return user;
                }
                else return null;
            }
            return null;
        }
    }
}
