using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Bank_Apis.Utils
{
    public class GenerateToken
    {
        private readonly IConfiguration _configuration;

        public GenerateToken(IConfiguration iconfiguration)
        {
            _configuration = iconfiguration;
        }

        public string[] GetToken(string email, string Id)
        {
            var claims = new[] {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt_Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("UserId", Id),
                        new Claim("Email", email)
                    };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt_Key"]));
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                _configuration["Jwt_Issuer"],
                _configuration["Jwt_Audience"],
                claims,
                expires: DateTime.UtcNow.AddMinutes(180),
                signingCredentials: signIn);
            var expires = DateTime.UtcNow.AddMinutes(180).ToString();

            return new[]
            {
                new JwtSecurityTokenHandler().WriteToken(token),
                expires
            };
           
        }
    }
}
