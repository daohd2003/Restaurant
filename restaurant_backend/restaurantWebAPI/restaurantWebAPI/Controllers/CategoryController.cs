using Microsoft.AspNetCore.Mvc;
using restaurantWebAPI.Models;
using restaurantWebAPI.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace restaurantWebAPI.Controllers
{
    [Route("api/category")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        // GET: api/<CategoryController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            var categories = await _categoryService.GetAllCategoriesAsync();
            return Ok(categories);
        }

        // GET api/<CategoryController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // Endpoint để lấy danh sách Category kèm MenuItems
        [HttpGet("with-menuitems")]
        public async Task<IActionResult> GetAllWithMenuItems()
        {
            try
            {
                var categories = await _categoryService.GetAllWithMenuItemsAsync();
                return Ok(categories);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error occurred while fetching categories", details = ex.Message });
            }
        }

        // POST api/<CategoryController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<CategoryController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<CategoryController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
