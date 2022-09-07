using Bank_Apis.Services.Branches;
using Bank_Apis.Services.Mono;
using BankApis.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Bank_Apis.Controllers
{
    [Route("api/user/branch/")]
    [ApiController]
    public class MonoController : ControllerBase
    {
        private readonly IMonoAccountInterface _monoActions;

        private readonly IBranchInterface _branchActions;

        public MonoController(IMonoAccountInterface monoActions, IBranchInterface branchActions)
        {
           _monoActions = monoActions;
            _branchActions = branchActions;
        }

        [HttpGet]
        [Route("AccountId/{branchId}")]
        [Authorize]
        public async Task<IActionResult> GetAccountId(string code, string branchId)
        {
            var branch = _branchActions.GetBranch(branchId);
            //checks user
            if(branch == null)
            {
                return Ok(null);
            }
            var accountId = await _monoActions.GetAccountId(code, branch.UserId);

            if(accountId == null)
            {
                return Ok(null);
            }
            else
            {
                branch.AccountId = accountId;
                await _branchActions.UpdateBranch(branchId, branch);
                return Ok(accountId);
            }   
        }

        [HttpGet]
        [Route("AccountInfo/{branchId}")]
        [Authorize]
        public async Task<IActionResult> GetAccountInfos(string branchId)
        {
            
            var accountInfo = await _monoActions.GetAccountInfo(branchId);
            return Ok(accountInfo);
        }

        [HttpGet]
        [Route("AccountStatement/{branchId}")]
        [Authorize]
        public async Task<IActionResult> GetAccountStatement(string branchId)
        {
            var accountStatement = await _monoActions.GetAccountStatement(branchId);
            if (accountStatement == null)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new ResponseModel("Failed", "Request Failed"));
            }
            return Ok(accountStatement);
        }

        [HttpGet]
        [Route("AccountStatement/{branchId}/(period)")]
        [Authorize]
        public async Task<IActionResult> GetAccountStatement(string branchId, int period)
        {
            var accountStatement = await _monoActions.GetAccountStatement(branchId, period);
            if(accountStatement == null)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new ResponseModel("Failed", "Request Failed"));
            }
            return Ok(accountStatement);
        }

        [HttpGet]
        [Route("Transactions/{branchId}")]
        [Authorize]
        public async Task<IActionResult> GetTransactions(string branchId)
        {
            var transactions = await _monoActions.GetTransactions(branchId);
            if (transactions == null)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new ResponseModel("Failed", "Request Failed"));
            }
            return Ok(transactions);
        }

        [HttpGet]
        [Route("AllTransactions/{userId}")]
        [Authorize]
        public async Task<IActionResult> GetAllTransactions(string userId)
        {
            var transactions = await _monoActions.GetAllTransactions(userId);
            if (transactions == null)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new ResponseModel("Failed", "Request Failed"));
            }
            return Ok(transactions);
        }

        [HttpGet]
        [Route("AccountIdentity/{userId}")]
        [Authorize]
        public async Task<IActionResult> GetAccountIdentity(string userId)
        {
            var accountIdentity = await _monoActions.GetAccountIdentity(userId);

            return Ok(accountIdentity);
        }


        [HttpGet]
        [Route("Income/{branchId}")]
        [Authorize]
        public async Task<IActionResult> GetAccountIncome(string branchId)
        {
            var Income = await _monoActions.GetIncome(branchId);
            return Ok(Income);
        }

        [HttpGet]
        [Route("UnlinkAccount/{branchId}")]
        [Authorize]
        public async Task<IActionResult> UnlinkAccount(string branchId)
        {
            var res = await _monoActions.UnlinkAccount(branchId);
            if(res == null)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new ResponseModel("Failed", "Request Failed"));
            }
            return Ok(res);

        }

        [HttpGet]
        [Route("/ManualSync/{branchId}")]
        [Authorize]
        public async Task<IActionResult> ManualSync(string branchId)
        {
            var Data = await _monoActions.ManualSync(branchId);
            return Ok(Data);
        }

        [HttpGet]
        [Route("/ReAuth/{branchId}")]
        [Authorize]
        public async Task<IActionResult> ReAuth(string branchId)
        {
            var AuthCode = await _monoActions.ReAuth(branchId);
            return Ok(AuthCode);
        }



        [HttpGet]
        [Route("/Instutitions")]
        public async Task<IActionResult> InstutitionsList()
        {
            var instutitions = await _monoActions.InstutitionsList();
            return Ok(instutitions);
        }



    }
}
