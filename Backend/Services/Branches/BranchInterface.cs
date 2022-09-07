using BankApis.Model.DbModels;

namespace Bank_Apis.Services.Branches
{
    public interface IBranchInterface
    {
        public Task<Branch> CreateBranchAsync(Branch branch);

        public IEnumerable<Branch> GetBranches(string user);

        public Branch GetBranch(string Id);

        public Task<Branch> UpdateBranch(string Id, Branch branch);

        public Task<Branch> DeleteBranch(string Id);


    }
}
