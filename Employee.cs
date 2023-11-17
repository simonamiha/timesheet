using System.ComponentModel.DataAnnotations;
using Timesheet.Interfaces;

namespace Timesheet
{
    public class Employee : ISoftDelete
    {
        [Key]
        public int? EmployeeId { get; set; } = null;
        public string FirstName { get; set; } = "";
        public string LastName { get; set; } = "";
        public string JobTitle { get; set; } = "";
        public string DepartmentName { get; set; } = "";
        public bool IsDeleted { get; set; } = false;
    }
}
