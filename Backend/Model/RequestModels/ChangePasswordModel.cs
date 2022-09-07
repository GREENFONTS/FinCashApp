namespace BankApis.Model.RequestModels
{
    public class ChangePasswordModel
    {
        public string UserId { get; set; } = null!;

        public string OldPassword { get; set; } = null!;

        public string NewPassword { get; set; } = null!;


    }
}
