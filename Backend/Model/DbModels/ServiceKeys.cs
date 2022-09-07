using System.ComponentModel.DataAnnotations;

namespace BankApis.Model.DbModels
{
    public class ServiceKeys
    {
        [Key]
        public string UserId { get; set; } = null;

        public string MonoPrivateKey { get; set; } = null;

        public string MonoSecretKey { get; set; } = null;

        public string FlutterKey { get; set; } = null;

    }
}
