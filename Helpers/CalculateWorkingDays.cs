namespace Timesheet.Helpers
{
    public class CalculateWorkingDays
    {
        public static int GetWorkingDays(DateOnly startDate, DateOnly endDate)
        {
            var workingDays = 1; //assuming you take 1 day of leave minimum to be valid
            for (var date = startDate.AddDays(1); date <= endDate; date = date.AddDays(1))
            {
                if (date.DayOfWeek != DayOfWeek.Saturday
                    && date.DayOfWeek != DayOfWeek.Sunday)
                    workingDays++;
            }

            return workingDays;
        }
    }
}
