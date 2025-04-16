using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using restaurantWebAPI.Hubs;
using restaurantWebAPI.Models;
using restaurantWebAPI.Services;

namespace restaurantWebAPI.Controllers
{
    [Route("api/menu")]
    [ApiController]
    public class MenuController : ControllerBase
    {
        private readonly IMenuService _menuService;
        private readonly ICategoryService _categoryService;
        private readonly IHubContext<MenuCategoryHub> _hubContext;

        public MenuController(IMenuService menuService, IHubContext<MenuCategoryHub> hubContext, ICategoryService categoryService)
        {
            _menuService = menuService;
            _hubContext = hubContext;
            _categoryService = categoryService;
        }

        // GET: api/<ValuesController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MenuItem>>> GetMenuItems()
        {
            var menuItems = await _menuService.GetAllMenuItemsAsync();
            return Ok(menuItems);
        }

/*        [Htt  pGet("with-categories")]
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
        public async Task<IActionResult> AddMenu(MenuItem menu)
        {
            if(menu == null)
            {
                return BadRequest("Menu item cannot be null");
            }

            var createdMenu = await _menuService.CreateMenuItemAsync(menu);

            // Lấy lại toàn bộ danh sách category với menu items mới nhất
            var updatedCategories = await _categoryService.GetAllWithMenuItemsAsync();

            // Gọi Hub để broadcast
            await _hubContext.Clients.All.SendAsync("ReceiveMenuUpdate", updatedCategories);

            return CreatedAtAction(nameof(Get), new { id = createdMenu.Id }, createdMenu);
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
