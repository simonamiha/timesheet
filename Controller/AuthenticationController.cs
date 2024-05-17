using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Timesheet.Data;

namespace Timesheet.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly UserManager<Employee> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly EmployeeContext _employeeContext;
        private readonly IConfiguration _configuration;

        public AuthenticationController(UserManager<Employee> userManager,
            RoleManager<IdentityRole> roleManager,
            EmployeeContext employeeContext,
            IConfiguration configuration)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _employeeContext = employeeContext;
            _configuration = configuration;
        }

        [HttpPost("register-user")]
        public async Task<IActionResult> Register([FromBody] Employee employee)
        {
            if (employee.Email == null) 
            {
                return BadRequest("Please provide Email address.");
            }

            var employeeExists = await _userManager.FindByEmailAsync(employee.Email);
            if (employeeExists != null) 
            {
                return BadRequest($"Employee with email address {employee.Email} already exists.");
            }

            Employee newEmployee = new Employee()
            {   
                UserName = employee.UserName,
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                Email = employee.Email,
                SecurityStamp = Guid.NewGuid().ToString()
            };

            var result = await _userManager.CreateAsync(newEmployee, employee.PasswordHash);

            if (result.Succeeded) return Ok("Employee created.");
            return BadRequest("Employee could not be created.");
        }
    }
}
