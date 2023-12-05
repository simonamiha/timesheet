using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Timesheet.Services
{
    public class TimeOnlyConverter : ValueConverter<TimeOnly, TimeSpan>
    {

        public TimeOnlyConverter() : base(
            TimeOnly => TimeOnly.ToTimeSpan(),
            timeSpan => TimeOnly.FromTimeSpan(timeSpan))
        { }
    }
}
