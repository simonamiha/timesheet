namespace Timesheet.Interfaces
{
    public interface IProcessStorage
    {
        Task<List<Employee>> GetAllEmployees();

        Task<Employee> GetEmployee(string id);

        Task DeleteAll();

        Task<Employee> CreateEmployee(Employee employee);

        Task<Employee> UpdateEmployee(Employee employee);

        Task DeleteEmployee(string id);
        
        Task<List<EmployeeLeave>> GetAllLeaves();

        Task<List<EmployeeLeave>> GetEmployeeLeaves(string id);

        Task<EmployeeLeave> AddLeave(EmployeeLeave leave);

        Task<EmployeeLeave> UpdateLeave(EmployeeLeave leave);

        Task DeleteAllLeaves();

        Task DeleteLeave(int id);
    }
}
