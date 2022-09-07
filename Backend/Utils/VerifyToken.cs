using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Principal;
using System.Text;

namespace Bank_Apis.Utils
{
    public class VerifyToken
    {
        private readonly IConfiguration _configuration;

        public VerifyToken(IConfiguration iconfiguration)
        {
            _configuration = iconfiguration;
        }
        public string verifyToken(string token)
        {
            var validationParameters = new TokenValidationParameters()
            {
                ValidateLifetime = false,
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidIssuer = _configuration["Jwt_Issuer"],
                ValidAudience = _configuration["Jwt_Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt_Key"]))
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            try
            {
                tokenHandler.ValidateToken(token, validationParameters, out SecurityToken validatedToken);
                var expiryDate = validatedToken.ValidTo;
                var userId = tokenHandler.ReadJwtToken(token).Claims.FirstOrDefault(claim => claim.Type == "UserId").Value;
                var currentDate = DateTime.Now;
                var value = DateTime.Compare(currentDate, expiryDate);
                if(value > 0)
                {
                    return null;
                }
                return userId;
            }
            catch(Exception e) {
                Console.WriteLine(e.Message);
                return null;
            }

        }

       
    }
}
