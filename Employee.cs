using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using Timesheet.Interfaces;

namespace Timesheet
{
    public class Employee : IdentityUser, ISoftDelete
    {
        public string FirstName { get; set; } = "";
        public string LastName { get; set; } = "";
        public string JobTitle { get; set; } = "";
        public string DepartmentName { get; set; } = "";
        public bool IsDeleted { get; set; } = false;
    }
}
