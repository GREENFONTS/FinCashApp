using BankApis.Model.DbModels;
using Microsoft.EntityFrameworkCore;

namespace Bank_Apis.Model
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Branch> Branches { get; set;}

        public DbSet<ServiceKeys> ServiceKeys { get; set; }
    }

}
