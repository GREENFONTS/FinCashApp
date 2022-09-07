using Bank_Apis.Services.FlutterWave;
using Bank_Apis.Services.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bank_Apis.Controllers
{
    [Route("api/user/")]
    [ApiController]
    public class FlutterWaveController : ControllerBase
    {
        private readonly IFlutterwaveActionInterface _flutterActions;
        private readonly IUserAuthenticationInterface _useractions;

        public FlutterWaveController(IFlutterwaveActionInterface flutterActions, IUserAuthenticationInterface useractions)
        {
            _flutterActions = flutterActions;
            _useractions = useractions;
        }

        [HttpGet]
        [Route("GetBillCategories")]
        [Authorize]
        public async Task<IActionResult> GetBillCategories(string UserId)
        {
            var user = await _useractions.GetUser(UserId);

            if (user == null)
            {
                return Ok(null);
            }
            var billCategories = await _flutterActions.GetBillCategories(user.Id);

            return Ok(billCategories);
        }

        [HttpPost]
        [Route("BuyAirtime")]
        //[Authorize]
        public async Task<IActionResult> BuyAirtime(string UserId, string customer, string amount)
        {
            var user = await _useractions.GetUser(UserId);

            if (user == null)
            {
                return Ok(null);
            }
            var airtimeResponse = await _flutterActions.BuyAirtime(user.Id, customer, amount);

            return Ok(airtimeResponse);
        }
    }
}
