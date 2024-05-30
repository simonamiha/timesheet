using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Web.Http.Cors;
using Timesheet.Interfaces;

namespace Timesheet.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("*", "*", "*")]
    [Authorize]
    public class LeaveController : ControllerBase
    {
        private readonly IProcessStorage _processStorage;

        public LeaveController(IProcessStorage service)
        {
            _processStorage = service;
        }

        [HttpGet]
        [Route("~/api/[controller]/getcurrentuser")]
        public async Task<ActionResult> GetCurrentUser()
        {

            var id = User.Claims.Where(x => x.Type == ClaimTypes.NameIdentifier).FirstOrDefault()?.Value;
            if (id == null)
            {
                return NotFound(); 
            }
            //return Ok(id);
            var employee = await _processStorage.GetEmployee(id);
            if (employee == null)
            {
                return NotFound();
            }
            return Ok(employee);
        }

        [HttpGet]
        [Route("~/api/[controller]/getall")]
        public async Task<ActionResult> GetAllLeaves()
        {
            var list = await _processStorage.GetAllLeaves();
            //var list = await _leaveContext.Leaves.Where(x => x.EmployeeId == 1).ToListAsync();

            if (list == null)
            {
                return NotFound();
            }
            return Ok(list);
        }

        [HttpGet]
        [Route("~/api/[controller]/getemployeeleaves")]
        public async Task<ActionResult> GetEmployeeLeaves(string id)
        {
            var list = await _processStorage.GetEmployeeLeaves(id);

            if (list == null)
            {
                return NotFound();
            }
            return Ok(list);
        }

        [HttpPost]
        [Route("~/api/[controller]/addleave")]
        public async Task<ActionResult<EmployeeLeave>> AddLeave(EmployeeLeave leave)
        {
            var result = await _processStorage.AddLeave(leave);

            if (result == null)
            {
                return BadRequest();
            }

            return Ok(result);
        }

        [HttpPut]
        [Route("~/api/[controller]/updateLeave")]
        public async Task<ActionResult<EmployeeLeave>> UpdateLeave(EmployeeLeave leave)
        {

            if (leave.LeaveId < 0)
            {
                return BadRequest();
            }

            var result = await _processStorage.UpdateLeave(leave);

            return Ok(result);
        }


        [HttpPost]
        [Route("~/api/[controller]/deleteAll")]
        public async Task<ActionResult> DeleteAllLeaves()
        {
            await _processStorage.DeleteAllLeaves();
            return Ok();
        }

        [HttpDelete]
        [Route("~/api/[controller]/deleteLeave")]
        public async Task<ActionResult> DeleteLeave(int id)
        {
            await _processStorage.DeleteLeave(id);
            return Ok();
        }

    }
}
