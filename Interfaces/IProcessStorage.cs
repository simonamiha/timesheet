namespace Timesheet.Interfaces
{
    public interface IProcessStorage
    {
        Task<List<Employee>> GetAllEmployees();

        Task<Employee> GetEmployee(int id);

        Task DeleteAll();

        Task<Employee> CreateEmployee(Employee employee);

        Task<Employee> UpdateEmployee(Employee employee);
    }
}
