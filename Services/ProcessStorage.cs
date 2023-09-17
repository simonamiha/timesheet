using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
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
    }
}
