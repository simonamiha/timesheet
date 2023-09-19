﻿using System.ComponentModel.DataAnnotations;

namespace Timesheet
{
    public class Employee
    {
        [Key]
        public int? EmployeeId { get; set; } = null;
        public string FirstName { get; set; } = "";
        public string LastName { get; set; } = "";
        public string JobTitle { get; set; } = "";
        public string DepartmentName { get; set; } = "";
    }
}
