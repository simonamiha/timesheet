using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Timesheet.Data;
using Timesheet.Interfaces;

namespace Timesheet.Services
{
    public class ProcessStorage : IProcessStorage
    {
        private readonly EmployeeContext _employeeContext;

        public ProcessStorage(EmployeeContext emcxt)
        {
            _employeeContext = emcxt;
        }

        public async Task<Employee> CreateEmployee(Employee employee)
        {
            var newEmployee = await _employeeContext.Employees.AddAsync(employee);
            await _employeeContext.SaveChangesAsync();
            return newEmployee.Entity;
        }

        public async Task DeleteAll()
        {
            await _employeeContext.Employees.ExecuteDeleteAsync();
            await _employeeContext.SaveChangesAsync();
        }

        public async Task<List<Employee>> GetAllEmployees()
        {
            return await _employeeContext.Employees.ToListAsync();
        }

        public async Task<Employee> GetEmployee(string id)
        {
            return await _employeeContext.Employees.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<EmployeeLeave>> GetEmployeeLeaves(string id)
        {
            return await _employeeContext.Leaves.Where(x => x.Id == id).ToListAsync();
        }

        public async Task<Employee> UpdateEmployee(Employee employee)
        {
            //_employeeContext.Entry(employee).State = EntityState.Modified;
            //Employee user = await userManager.FindByIdAsync(employee.Id);

            //user.FirstName = employee.FirstName;

            var oldEmployee = await _employeeContext.Employees.FirstOrDefaultAsync(x => x.Id == employee.Id);
            oldEmployee.FirstName = employee.FirstName;
            oldEmployee.LastName = employee.LastName;
            oldEmployee.JobTitle = employee.JobTitle;
            oldEmployee.DepartmentName = employee.DepartmentName;

            try
            {
                await _employeeContext.SaveChangesAsync();
                //await userManager.UpdateAsync(user);
            }

            catch (DbUpdateConcurrencyException)
            {
                if (!_employeeContext.Employees.Any(p => p.Id == employee.Id))
                {
                    return null;
                }
                else
                {
                    throw;
                }
            }

            return employee;
        }

        public async Task DeleteEmployee(string id)
        {
            var deletedEmployee = await _employeeContext.Employees.FirstOrDefaultAsync(x => x.Id == id);

            if (deletedEmployee != null)
            {
                _employeeContext.Employees.Remove(deletedEmployee);
            }

            await _employeeContext.SaveChangesAsync();
        }


        public async Task<List<EmployeeLeave>> GetAllLeaves()
        {
            return await _employeeContext.Leaves.ToListAsync();
        }


        public async Task<EmployeeLeave> AddLeave(EmployeeLeave leave)
        {
            var check = await _employeeContext.Employees.Where(x => x.Id == leave.Id).SingleOrDefaultAsync();
            if (check == null)
            {
                return null;
            }
            var leaveDays = Helpers.CalculateWorkingDays.GetWorkingDays(leave.LeaveStartDate, leave.LeaveEndDate);
            leave.LeaveWorkingDays = leaveDays;

            var newLeave = await _employeeContext.Leaves.AddAsync(leave);
            await _employeeContext.SaveChangesAsync();
            return newLeave.Entity;
        }

        public async Task<EmployeeLeave> UpdateLeave(EmployeeLeave leave)
        {
            _employeeContext.Entry(leave).State = EntityState.Modified;

            try
            {
                await _employeeContext.SaveChangesAsync();
            }

            catch (DbUpdateConcurrencyException)
            {
                if (!_employeeContext.Leaves.Any(p => p.LeaveId == leave.LeaveId))
                {
                    return null;
                }
                else
                {
                    throw;
                }
            }

            return leave;
        }

        public async Task DeleteAllLeaves()
        {
            await _employeeContext.Leaves.ExecuteDeleteAsync();
            await _employeeContext.SaveChangesAsync();
        }

        public async Task DeleteLeave(int id)
        {
            var deletedLeave = await _employeeContext.Leaves.FirstOrDefaultAsync(x => x.LeaveId == id);

            if (deletedLeave != null)
            {
                _employeeContext.Leaves.Remove(deletedLeave);
            }

            await _employeeContext.SaveChangesAsync();
        }
    }
}
