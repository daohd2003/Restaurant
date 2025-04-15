using System.Collections.Generic;
using System.Threading.Tasks;
using restaurantWebAPI.Models;

namespace restaurantWebAPI.Services
{
    public interface IMenuService
    {
        Task<IEnumerable<MenuItem>> GetAllMenuItemsAsync();
        Task<MenuItem> GetMenuItemByIdAsync(int id);
        Task<MenuItem> CreateMenuItemAsync(MenuItem menuItem);
        Task<MenuItem> UpdateMenuItemAsync(int id, MenuItem menuItem);
        Task<bool> DeleteMenuItemAsync(int id);
        /*Task<IEnumerable<MenuItem>> GetMenuItemsByCategoryAsync(string categorySlug);*/
    }
}
