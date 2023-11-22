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

        public async Task<Employee> GetEmployee(int id)
        {
            return await _employeeContext.Employees.FirstOrDefaultAsync(x => x.EmployeeId == id);
        }

        public async Task<Employee> UpdateEmployee(Employee employee)
        {
            _employeeContext.Entry(employee).State = EntityState.Modified;

            try
            {
                await _employeeContext.SaveChangesAsync();
            }

            catch (DbUpdateConcurrencyException)
            {
                if (!_employeeContext.Employees.Any(p => p.EmployeeId == employee.EmployeeId))
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

        public async Task DeleteEmployee(int id)
        {
            var deletedEmployee = await _employeeContext.Employees.FirstOrDefaultAsync(x => x.EmployeeId == id);

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
            var check = await _employeeContext.Employees.Where(x => x.EmployeeId == leave.EmployeeId).SingleOrDefaultAsync();
            if (check == null)
            {
                return null;
            }
            var newLeave = await _employeeContext.Leaves.AddAsync(leave);
            await _employeeContext.SaveChangesAsync();
            return newLeave.Entity;
        }
    }
}
