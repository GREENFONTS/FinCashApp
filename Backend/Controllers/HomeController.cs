using Bank_Apis.Services.Users;
using Bank_Apis.Utils;
using BankApis.Model;
using BankApis.Model.DbModels;
using BankApis.Model.RequestModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Bank_Apis.Controllers
{
    [Route("api/")]
    [ApiController]
    public class HomeController : ControllerBase
    {

        private readonly IUserAuthenticationInterface _userActions;

        public HomeController(IUserAuthenticationInterface userActions)
        {
            _userActions = userActions;
        }

       
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(User _user)
        {
            _user.Id = Guid.NewGuid().ToString();
            _user.Password = PasswordHash.HashPassword(_user.Password);
            _user.IsEmailVerified = false;
           
            var user = await _userActions.CreateUserAsync(_user);
            if(user == null)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new ResponseModel("Failed", "User already exist"));


            }
            var token = _userActions.GetToken(user.Email, user.Id);
            return Ok(
                    new
                    {
                        user,
                        token,
                    }
                    );
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginModel _loginData)
        {
            var user = await _userActions.GetUserViaEmail(_loginData.Email);

            if (user != null)
            {
                bool checkPassword = PasswordHash.VerifyHash(user.Password, _loginData.Password);
                
                if (checkPassword)
                {
                    var token = _userActions.GetToken(user.Email, user.Id);
                    var monoKey = _userActions.GetAccountKey(user.Id);
                    return Ok(new
                    {
                        token, 
                        user,
                        monoKey
                    }

                    );
                }
                else
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new ResponseModel("Failed", "Password is Incorrect"));
                }
            }

            return StatusCode(StatusCodes.Status400BadRequest, new ResponseModel("Failed", "User not found"));
        }

        [HttpPost("user/{Id}")]
        [Authorize]
        public async Task<IActionResult> UpdateUser(string Id, User user)
        {
            var UpdatedUser = await _userActions.UpdateUser(Id, user);
            if(UpdatedUser == null)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new ResponseModel("Failed", "User not found"));
            }
            return Ok(UpdatedUser);
        }

        [HttpPost]
        [Route("AddAccountKeys")]
        [Authorize]
        public async Task<IActionResult> AddAccountKeys(ServiceKeys _servicekey)
        {
            var serviceKey = await _userActions.AddAccountKeys(_servicekey);
            if (serviceKey == null)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new ResponseModel("Failed", "User not found"));

            }
            return Ok(serviceKey.MonoPrivateKey);
        }



        [HttpPost]
        [Route("UpdateAccountKeys")]
        [Authorize]
        public async Task<IActionResult> UpdateAccountKeys(ServiceKeys _servicekey)
        {
            var serviceKey = await _userActions.UpdateAccountKeys(_servicekey);
            if (serviceKey == null)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new ResponseModel("Failed", "AccountKeys not found"));

            }
            return Ok(serviceKey.MonoPrivateKey);
        }

        [HttpPost]
        [Route("user/ChangePassword/")]
        [Authorize]
        public async Task<IActionResult> ChangePassword(ChangePasswordModel data)
        {
            var user = await _userActions.ChangePassword(data);
            if(user == null)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new ResponseModel("Failed", "Old Password is Incorrect"));
            }
            else
            {
                return Ok(user);
            }
        }

        [HttpGet]
        [Route("verifyToken")]
        public IActionResult VerifyToken(string token)
        {
            var user = _userActions.VerifyToken(token);
            if(user != null)
            {
                var monoKey = _userActions.GetAccountKey(user.Id);
                return Ok(new { 
                user,
                monoKey});

            }
            user = null;
            return Ok(new
            {
                user,
            });
        }

    }
}
