using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Timesheet.Services.Comparers
{
    public class TimeOnlyComparer: ValueComparer<TimeOnly>
    {
        public TimeOnlyComparer() : base(
            (x, y) => x.Ticks == y.Ticks,
            timeOnly => timeOnly.GetHashCode())
        { }
    }
}
