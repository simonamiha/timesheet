using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net.Http.Headers;
using System.Web.Http.Cors;
using Timesheet.Data;
using Timesheet.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Timesheet.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("*", "*", "*")]
    public class EmployeeController : ControllerBase
    {
        private readonly IProcessStorage _processStorage;

        public EmployeeController(IProcessStorage service)
        {
            _processStorage = service;
        }

        [HttpGet]
        [Route("~/api/[controller]/getall")]
        public async Task<ActionResult> GetAllEmployees()
        {
            var list = await _processStorage.GetAllEmployees();
            if (list == null)
            {
                return NotFound();
            }
            return Ok(list);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var employee = await _processStorage.GetEmployee(id);
            if (employee == null)
            {
                return NotFound();
            }
            return Ok(employee);
        }

        [HttpPost]
        [Route("createemployee")]
        public async Task<ActionResult<Employee>> PostEmployee(Employee employee)
        {
            var result = await _processStorage.CreateEmployee(employee);
            return Ok(result);
        }


        [HttpPost]
        [Route("deleteAll")]
        public async Task<ActionResult> DeleteAll()
        {
            await _processStorage.DeleteAll();
            return Ok();
        }

        [HttpPost]
        [Route("editEmployee")]
        public Task<ActionResult> EditEmployee(Employee employee)
        {
        }
    }
}
