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

        public async Task<Employee> UpdateEmployee(int id, Employee employee)
        {
            _employeeContext.Entry(employee).State = EntityState.Modified;

            try
            {
                await _employeeContext.SaveChangesAsync();
            }

            catch (DbUpdateConcurrencyException)
            {
                if (!_employeeContext.Employees.Any(p => p.EmployeeId == id))
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
    }
}
