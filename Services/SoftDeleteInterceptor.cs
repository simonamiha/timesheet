using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Timesheet.Interfaces;

namespace Timesheet.Services
{
    public class SoftDeleteInterceptor : SaveChangesInterceptor
    {
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

        public async override ValueTask<InterceptionResult<int>> SavingChangesAsync(
            DbContextEventData employee,
            InterceptionResult<int> result,
            CancellationToken cancellationToken = default)
        {
            if (employee.Context is null) return result;

            foreach (var entry in employee.Context.ChangeTracker.Entries())
            {
                if (entry is not { State: EntityState.Deleted, Entity: ISoftDelete delete }) continue;

                entry.State = EntityState.Modified;
                delete.IsDeleted = true;
            }

            return await ValueTask.FromResult(result);
        }

    }
}
