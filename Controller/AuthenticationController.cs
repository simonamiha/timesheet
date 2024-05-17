using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
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

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Employee employee)
        {
            var employeeExists = await _userManager.FindByEmailAsync(employee.Email);
            if (employeeExists != null && await _userManager.CheckPasswordAsync(employeeExists, employee.PasswordHash))
            {
                var tokenValue = await GenerateJWTTokenAsync(employeeExists);

                return Ok(tokenValue);
            }
            return Unauthorized();
        }

        private async Task<AuthResult> GenerateJWTTokenAsync(Employee employeeExists)
        {
            var authClaims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, employeeExists.UserName),
                new Claim(ClaimTypes.NameIdentifier, employeeExists.Id),
                new Claim(JwtRegisteredClaimNames.Email, employeeExists.Email),
                new Claim(JwtRegisteredClaimNames.Sub, employeeExists.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:Issuer"],
                expires: DateTime.UtcNow.AddMinutes(10),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256));

            var jwtToken = new JwtSecurityTokenHandler().WriteToken(token);

            var respone = new AuthResult()
            {
                Token = jwtToken,
                ExpiresAt = token.ValidTo
            };

            return respone;
        }
    }
}
