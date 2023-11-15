using Microsoft.EntityFrameworkCore;
using Timesheet.Services;

namespace Timesheet.Data
{
    public class EmployeeContext : DbContext
    {
        public DbSet<Employee> Employees { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=localhost;Database=master;Trusted_Connection=True;TrustServerCertificate=True;")
                .AddInterceptors(new SoftDeleteInterceptor());
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>()
                .HasQueryFilter(x => x.IsDeleted == false);
        }
    }

}
