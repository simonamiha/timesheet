using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Web.Http.Cors;
using Timesheet.Data;

namespace Timesheet.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("*", "*", "*")]
    public class LeaveController : ControllerBase
    {
        private readonly EmployeeContext _leaveContext;

        public LeaveController(EmployeeContext lvcxt)
        {
            _leaveContext = lvcxt;
        }

        [HttpGet]
        [Route("~/api/[controller]/getall")]
        public async Task<ActionResult> GetAllLeaves()
        {
            var list = await _leaveContext.Leaves.ToListAsync();
            //var list = await _leaveContext.Leaves.Where(x => x.EmployeeId == 1).ToListAsync();

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
            var newLeave = await _leaveContext.Leaves.AddAsync(leave);
            await _leaveContext.SaveChangesAsync();
            return newLeave.Entity;
        }
    }
}
