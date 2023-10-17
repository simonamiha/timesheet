using FluentValidation;

namespace Timesheet
{
    public class EmployeeValidator : AbstractValidator<Employee>
    {
        public EmployeeValidator()
        {
            RuleFor(employee => employee.LastName).NotNull().NotEmpty().Length(2, 25);
            RuleFor(employee => employee.FirstName).NotNull().NotEmpty().Length(2, 25);
            RuleFor(employee => employee.JobTitle).NotNull().NotEmpty().Length(5, 50);
            RuleFor(employee => employee.DepartmentName).NotNull().NotEmpty().Length(2, 50);
        }
    }
}
