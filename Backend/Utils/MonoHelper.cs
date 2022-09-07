using Bank_Apis.Model;

namespace Bank_Apis.Utils
{
    public static class Monohelper
    {
        public static string AccountId(DatabaseContext _dbclient, string branchId)
        {
            var branch = _dbclient.Branches.FirstOrDefault(x => x.BranchId == branchId);
            if(branch == null)
            {
                return null;
            }
            return branch.AccountId;
        }

        public static string UserId(DatabaseContext _dbclient, string branchId)
        {
            var branch = _dbclient.Branches.FirstOrDefault(x => x.BranchId == branchId);
            if (branch == null)
            {
                return null;
            }
            return branch.UserId;
        }

        public static string MonoKey(DatabaseContext _dbclient, string userId)
        {
            var serviceKeys = _dbclient.ServiceKeys.FirstOrDefault(x => x.UserId == userId);
            if(serviceKeys == null)
            {
                return null;
            }
            return serviceKeys.MonoSecretKey;
        }
    }
}
