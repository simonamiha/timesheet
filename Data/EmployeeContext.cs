using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Timesheet.Services;
using Timesheet.Services.Comparers;

namespace Timesheet.Data
{
    public class EmployeeContext : IdentityDbContext<Employee>
    {
        public DbSet<Employee> Employees { get; set; } = null!;

        public DbSet<EmployeeLeave> Leaves { get; set; } = null!;

        protected override void ConfigureConventions(ModelConfigurationBuilder builder)
        {
            base.ConfigureConventions(builder);

            builder.Properties<DateOnly>()
                .HaveConversion<DateOnlyConverter, DateOnlyComparer>()
                .HaveColumnType("date");

            builder.Properties<TimeOnly>()
                .HaveConversion<TimeOnlyConverter, TimeOnlyComparer>();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=localhost;Database=master;Trusted_Connection=True;TrustServerCertificate=True;")
                .AddInterceptors(new SoftDeleteInterceptor());
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Employee>()
                .HasQueryFilter(x => x.IsDeleted == false);
        }
    }
}