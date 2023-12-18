namespace Timesheet.Interfaces
{
    public interface IProcessStorage
    {
        Task<List<Employee>> GetAllEmployees();

        Task<Employee> GetEmployee(int id);

        Task DeleteAll();

        Task<Employee> CreateEmployee(Employee employee);

        Task<Employee> UpdateEmployee(Employee employee);

        Task DeleteEmployee(int id);
        
        Task<List<EmployeeLeave>> GetAllLeaves();

        Task<EmployeeLeave> AddLeave(EmployeeLeave leave);

        Task<EmployeeLeave> UpdateLeave(EmployeeLeave leave);

        Task DeleteAllLeaves();

        Task DeleteLeave(int id);
    }
}
