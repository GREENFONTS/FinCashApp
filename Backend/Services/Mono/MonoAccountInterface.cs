using System.Runtime.InteropServices;

namespace Bank_Apis.Services.Mono
{
    public interface IMonoAccountInterface
    {

        public Task<string> GetAccountId(string code, string UserId);
        public Task<string> GetAccountInfo(string branchId);

        public Task<string> GetAccountStatement(string branchId);
        public Task<string> GetAccountStatement(string branchId, int period);

        public Task<string> GetTransactions(string branchId);

        public Task<List<string>> GetAllTransactions(string userId);

        public Task<string> GetIncome(string branchId);

        public Task<string> UnlinkAccount(string branchId);

        public Task<string> GetAccountIdentity(string branchId);

        public Task<string> ManualSync(string branchId);

        public Task<string> ReAuth(string branchId);

        public Task<string> InstutitionsList();
    }
}
