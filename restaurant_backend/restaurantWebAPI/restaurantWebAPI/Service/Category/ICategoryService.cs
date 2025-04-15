using System.Collections.Generic;
using System.Threading.Tasks;
using restaurantWebAPI.DTOs;
using restaurantWebAPI.Models;

namespace restaurantWebAPI.Services
{
    public interface ICategoryService
    {
        Task<IEnumerable<Category>> GetAllCategoriesAsync();
        Task<Category> GetCategoryByIdAsync(int id);
        Task<Category> CreateCategoryAsync(Category category);
        Task<Category> UpdateCategoryAsync(int id, Category category);
        Task<bool> DeleteCategoryAsync(int id);
        Task<IEnumerable<CategoryDto>> GetAllWithMenuItemsAsync();
    }
}
