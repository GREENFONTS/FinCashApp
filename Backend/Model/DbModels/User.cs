using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankApis.Model.DbModels
{
    [Index(nameof(Email), IsUnique = true)]
    public class User
    {

        [Key]
        public string Id { get; set; } = null!;

        [MaxLength(20)]
        public string FirstName { get; set; } = null!;

        [MaxLength(20)]
        public string LastName { get; set; } = null!;

        [MaxLength(20)]
        public string UserName { get; set; } = null!;

        [MaxLength(50)]
        public string Email { get; set; } = null!;

        [MaxLength(100)]
        public string Password { get; set; } = null!;

        public bool IsEmailVerified { get; set; } = false;

    }
}
