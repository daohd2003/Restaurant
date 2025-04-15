using Microsoft.AspNetCore.Mvc;
using restaurantWebAPI.Models;
using restaurantWebAPI.Services;

namespace restaurantWebAPI.Controllers
{
    [Route("api/menu")]
    [ApiController]
    public class MenuController : ControllerBase
    {
        private readonly IMenuService _menuService;

        public MenuController(IMenuService menuService)
        {
            _menuService = menuService;
        }

        // GET: api/<ValuesController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MenuItem>>> GetMenuItems()
        {
            var menuItems = await _menuService.GetAllMenuItemsAsync();
            return Ok(menuItems);
        }

/*        [HttpGet("with-categories")]
        public async Task<ActionResult<IEnumerable<MenuItem>>> GetMenuItemsWithCategories(String slug)
        {
            var menuItems = await _menuService.GetMenuItemsByCategoryAsync(slug);
            return Ok(menuItems);
        }*/

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<ValuesController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
