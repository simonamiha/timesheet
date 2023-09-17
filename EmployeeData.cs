using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Eventing.Reader;
using System.Runtime.InteropServices;
using Timesheet.Data;

namespace Timesheet
{

                                            
    public class EmployeeData
    {
        //internal static async Task<List<Employee>> GetAllEmployees()
        //{
        //    var dbContext = new EmployeeContext();
        //    return await dbContext.Employees.ToListAsync();
        //}

        //public static async Task<Employee> GetEmployee(int id)
        //{

        //    var employees = await GetAllEmployees();
        //    if(employees == null)
        //    {
        //        throw new ArgumentNullException(nameof(employees));
        //    }
        //    return employees.FirstOrDefault(x => x.EmployeeId == id);

        //}

        //internal static async Task DeleteAll()
        //{
        //    var dbcontext = new EmployeeContext();
        //    //var empDelete = dbcontext.Employees.Where(x => x.EmployeeId == 7);
        //    await dbcontext.Employees.ExecuteDeleteAsync();
        //    await dbcontext.SaveChangesAsync();
        //}

        //public static async Task CreateEmployee(Employee employee)
        //{
        //    var dbContext = new EmployeeContext();
        //    await dbContext.Employees.AddAsync(employee);
        //    await dbContext.SaveChangesAsync();
        //}

    }
}
