namespace BankApis.Model
{
    public class ResponseModel
    {
        public string Status { get; set; } = null!;

        public string Message { get; set; } = null!;

        public ResponseModel(string status, string message)
        {
            Status = status;
            Message = message;
        }
    }
}
