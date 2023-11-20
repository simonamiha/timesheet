using System.ComponentModel.DataAnnotations;

namespace Timesheet
{
    public class EmployeeLeave
    {
        [Key]
        public int EmployeeId { get; set; }

        public DateTime LeaveStartDate { get; set; }

        public DateTime LeaveEndDate { get; set; }

        public LeaveStatus LeaveStatus { get; set; }

    }
}
