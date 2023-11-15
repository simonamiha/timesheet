using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Timesheet.Data;
using Timesheet.Interfaces;

namespace Timesheet.Services
{
    public class SoftDeleteInterceptor : SaveChangesInterceptor
    {
        //private readonly EmployeeContext? _employeeContext;

        public override InterceptionResult<int> SavingChanges(
            DbContextEventData employee,
            InterceptionResult<int> result)
        {
            if (employee.Context is null) return result;

            foreach (var entry in employee.Context.ChangeTracker.Entries())
            {
                if (entry is not { State: EntityState.Deleted, Entity: ISoftDelete delete }) continue;

                entry.State = EntityState.Modified;
                delete.IsDeleted = true;
            }

            return result;
        }
    }
}
