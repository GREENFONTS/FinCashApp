using Bank_Apis.Services.Branches;
using BankApis.Model;
using BankApis.Model.DbModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Bank_Apis.Controllers
{
    [Route("api/user/Branch/")]
    [ApiController]
    public class BranchController : ControllerBase
    {
        private readonly IBranchInterface _branchActions;

        public BranchController(IBranchInterface userActions)
        {
            _branchActions = userActions;
        }

        [HttpGet]
        [Authorize]
        public IActionResult GetBranches(string userId)
        {
            var branches = _branchActions.GetBranches(userId);
            return Ok(branches);
        }

        [HttpPost]
        [Route("create")]
        [Authorize]
        public async Task<IActionResult> Register(Branch _branch)
        {

            _branch.BranchId = Guid.NewGuid().ToString();
            var branch = await _branchActions.CreateBranchAsync(_branch);

            if(branch != null)
            {
                return Ok(branch);
            }

            return StatusCode(StatusCodes.Status400BadRequest, new ResponseModel("Failed", "Branch already exist"));
        }

        [HttpGet("Id")]
        [Authorize]
        public IActionResult GetBranch(string Id)
        {
            Console.WriteLine(User.Identity.IsAuthenticated);
            var branch = _branchActions.GetBranch(Id);
            return Ok(branch);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateBranch(string Id, Branch branch)
        {
            var UpdatedBranch = await _branchActions.UpdateBranch(Id, branch);
            return Ok(UpdatedBranch);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteBranch(string Id)
        {
            var DeletedBranch = await _branchActions.DeleteBranch(Id);
            return Ok(DeletedBranch);
        }



    }
}

   
   

       
