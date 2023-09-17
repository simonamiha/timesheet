using Microsoft.EntityFrameworkCore;

namespace Timesheet.Data
{
    public class EmployeeContext : DbContext
    {
        public DbSet<Employee> Employees { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=localhost;Database=master;Trusted_Connection=True;TrustServerCertificate=True;");
        }
    }

}
