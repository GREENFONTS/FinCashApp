using System.ComponentModel.DataAnnotations;

namespace BankApis.Model.DbModels
{
    public class Branch

    {
        [Key]
        public string BranchId { get; set; }

        [Required]
        [MaxLength(20)]
        public string BranchName { get; set; }

        [MaxLength(100)]
        public string? Address { get; set; }

        public string? Description { get; set; }

        [Required]
        public string UserId { get; set; }

        [MaxLength(30)]
        public string? AccountId { get; set; }


    }
}
