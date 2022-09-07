using Bank_Apis.Model;
using Mono.Net.Sdk;
using Mono.Net.Sdk.Models.Auth;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Runtime.InteropServices;

namespace Bank_Apis.Services.Mono
{
    
    public class MonoAccountActions : IMonoAccountInterface
    {
        private readonly HttpClient netClient = new();
        private readonly DatabaseContext _dbclient;
        private MonoClient _client;

        private readonly MonoClientSetup _clientSetup = new();


        public MonoAccountActions(DatabaseContext client)
        {
            netClient.BaseAddress = new Uri("https://api.withmono.com/accounts/");
            netClient.DefaultRequestHeaders.Accept.Clear();
            netClient.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
            _dbclient = client;
        }
     
        public async Task<string> GetAccountId(string code, string UserId)
        {
            //Get the account Id
            _client = _clientSetup.GetMonoClient(_dbclient, UserId);

            var response = await _client.Auth.GetAccountId(new AuthAccountRequest
            {
                Code = code
            });
            string accountId = response.Data.AccountId;          
            
            return accountId;
        }

        public async Task<string> GetAccountIdentity(string userId)
        {
            _client = _clientSetup.GetMonoClient(_dbclient, userId);

            var branch = _dbclient.Branches.FirstOrDefault(x => x.AccountId != "");

            if (branch != null)
            {
                var response = await _client.Accounts.GetUserIdentity(branch.AccountId);
                return JsonConvert.SerializeObject(response.Data);
            }
            return null;

            
        }

        public async Task<string> GetAccountInfo(string branchId)
        {
            var userId = Utils.Monohelper.UserId(_dbclient, branchId);
            _client = _clientSetup.GetMonoClient(_dbclient, userId);

            var accountId = Utils.Monohelper.AccountId(_dbclient, branchId);

            var response = await _client.Accounts.GetInformation(accountId);
               return JsonConvert.SerializeObject(response.Data.Account);
            
        }

        public async Task<string> GetAccountStatement(string branchId)
        {
            var userId = Utils.Monohelper.UserId(_dbclient, branchId);
            _client = _clientSetup.GetMonoClient(_dbclient, userId);

            var accountId = Utils.Monohelper.AccountId(_dbclient, branchId);
            Console.WriteLine(accountId);

            var monoSecret = Utils.Monohelper.MonoKey(_dbclient, userId);
            netClient.DefaultRequestHeaders.Add("mono-sec-key", monoSecret);
            HttpResponseMessage res = await netClient.GetAsync($"{accountId}/statement");
            if (res.IsSuccessStatusCode)
            {
                var data = await res.Content.ReadAsStringAsync();
                Console.WriteLine(data);
                return JsonConvert.SerializeObject(data);

            }
            return null;
        }

        public async Task<string> GetAccountStatement(string branchId, int period)
        {
            var userId = Utils.Monohelper.UserId(_dbclient, branchId);
            _client = _clientSetup.GetMonoClient(_dbclient, userId);

            var accountId = Utils.Monohelper.AccountId(_dbclient, branchId);
            Console.WriteLine(accountId);

            var monoSecret = Utils.Monohelper.MonoKey(_dbclient, userId);
            netClient.DefaultRequestHeaders.Add("mono-sec-key", monoSecret);
            HttpResponseMessage res = await netClient.GetAsync($"{accountId}/statement?period={period}");
            if (res.IsSuccessStatusCode)
            {
                var data = await res.Content.ReadAsStringAsync();
                return JsonConvert.SerializeObject(data);

            }
            return null;
        }

            public async Task<string> GetIncome(string branchId)
        {
            var userId = Utils.Monohelper.UserId(_dbclient, branchId);
            _client = _clientSetup.GetMonoClient(_dbclient, userId);

            var accountId = Utils.Monohelper.AccountId(_dbclient, branchId);

            var response = await _client.Accounts.GetIncome(accountId);

            return JsonConvert.SerializeObject(response.Data);
        }

        public async Task<string> GetTransactions(string branchId)
        {
            var userId = Utils.Monohelper.UserId(_dbclient, branchId);
            _client = _clientSetup.GetMonoClient(_dbclient, userId);

            var accountId = Utils.Monohelper.AccountId(_dbclient, branchId);
            Console.WriteLine(accountId);

            var monoSecret = Utils.Monohelper.MonoKey(_dbclient, userId);
            netClient.DefaultRequestHeaders.Add("mono-sec-key", monoSecret);
            HttpResponseMessage res = await netClient.GetAsync($"{accountId}/transactions?limit=1000");
            if (res.IsSuccessStatusCode)
            {
                var data = await res.Content.ReadAsStringAsync();
                JArray dataArray = (JArray)(JObject.Parse(data))["data"];
                Console.WriteLine(dataArray);
                return JsonConvert.SerializeObject(dataArray);

            }

            return null;
        }

        public async Task<string> InstutitionsList()
        {
            var response = await _client.Misc.GetInstitutions();

            return JsonConvert.SerializeObject(response.Data);
        }

        public async Task<string> ManualSync(string branchId)
        {
            var userId = Utils.Monohelper.UserId(_dbclient, branchId);
            _client = _clientSetup.GetMonoClient(_dbclient, userId);

            var accountId = Utils.Monohelper.AccountId(_dbclient, branchId);
            var response = await _client.Auth.SyncDataManually(accountId); ;

            return JsonConvert.SerializeObject(response.Data);
        }

        public async Task<string> ReAuth(string branchId)
        {
            var userId = Utils.Monohelper.UserId(_dbclient, branchId);
            _client = _clientSetup.GetMonoClient(_dbclient, userId);

            var accountId = Utils.Monohelper.AccountId(_dbclient, branchId);
            var response = await _client.Auth.ReAuthorizeCode(accountId); ;

            return JsonConvert.SerializeObject(response.Data);
        }



        public async Task<string> UnlinkAccount(string branchId)
        {
            
            var userId = Utils.Monohelper.UserId(_dbclient, branchId);
            Console.WriteLine(userId);
            _client = _clientSetup.GetMonoClient(_dbclient, userId);

            var accountId = Utils.Monohelper.AccountId(_dbclient, branchId);
            Console.WriteLine(accountId);

            var monoSecret = Utils.Monohelper.MonoKey(_dbclient, userId);
            netClient.DefaultRequestHeaders.Add("mono-sec-key", monoSecret);
            HttpResponseMessage res = await netClient.PostAsync($"https://api.withmono.com/accounts/{accountId}/unlink", null);
            if (res.IsSuccessStatusCode)
            {
                var Currentbranch = _dbclient.Branches.FirstOrDefault(x => x.BranchId == branchId);
                _dbclient.Branches.Remove(Currentbranch);
                await _dbclient.SaveChangesAsync();

                return await res.Content.ReadAsStringAsync();

            }
            var branch = _dbclient.Branches.FirstOrDefault(x => x.BranchId == branchId);
            _dbclient.Branches.Remove(branch);
            await _dbclient.SaveChangesAsync();
            return null;
        }

        public async Task<List<string>> GetAllTransactions(string userId)
        {
            var transactions = new List<string>();
            var accountIds = _dbclient.Branches.Where(x => x.UserId == userId).Select(x => x.AccountId).ToList();

            var monoSecret = Utils.Monohelper.MonoKey(_dbclient, userId);
            netClient.DefaultRequestHeaders.Add("mono-sec-key", monoSecret);
            foreach (string account in accountIds)
            {                
                HttpResponseMessage res = await netClient.GetAsync($"{account}/transactions?limit=1000");
                if (res.IsSuccessStatusCode)
                {
                    var data = await res.Content.ReadAsStringAsync();
                    JArray dataArray = (JArray)(JObject.Parse(data))["data"];
                    
                   transactions.Add(JsonConvert.SerializeObject(dataArray));

                }
            }

            return transactions;
        }
    }
}
