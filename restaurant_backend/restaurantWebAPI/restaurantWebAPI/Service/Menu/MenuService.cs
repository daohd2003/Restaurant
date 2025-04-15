using Microsoft.EntityFrameworkCore;
using restaurantWebAPI.Data;
using restaurantWebAPI.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace restaurantWebAPI.Services
{
    public class MenuService : IMenuService
    {
        private readonly RestaurantDbContext _context;

        public MenuService(RestaurantDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<MenuItem>> GetAllMenuItemsAsync()
        {
            return await _context.MenuItems.ToListAsync();
        }

        public async Task<MenuItem> GetMenuItemByIdAsync(int id)
        {
            return await _context.MenuItems.Include(m => m.Category).FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task<MenuItem> CreateMenuItemAsync(MenuItem menuItem)
        {
            _context.MenuItems.Add(menuItem);
            await _context.SaveChangesAsync();
            return menuItem;
        }

        public async Task<MenuItem> UpdateMenuItemAsync(int id, MenuItem menuItem)
        {
            var existingMenuItem = await _context.MenuItems.FindAsync(id);
            if (existingMenuItem == null) return null;

            existingMenuItem.Name = menuItem.Name;
            existingMenuItem.Description = menuItem.Description;
            existingMenuItem.Price = menuItem.Price;
            existingMenuItem.IsFeatured = menuItem.IsFeatured;
            existingMenuItem.IsAvailable = menuItem.IsAvailable;
            existingMenuItem.SpicyLevel = menuItem.SpicyLevel;
            existingMenuItem.PreparationTime = menuItem.PreparationTime;
            existingMenuItem.CategoryId = menuItem.CategoryId;

            await _context.SaveChangesAsync();
            return existingMenuItem;
        }

        public async Task<bool> DeleteMenuItemAsync(int id)
        {
            var menuItem = await _context.MenuItems.FindAsync(id);
            if (menuItem == null) return false;

            _context.MenuItems.Remove(menuItem);
            await _context.SaveChangesAsync();
            return true;
        }

        /*public async Task<IEnumerable<MenuItem>> GetMenuItemsByCategoryAsync(string categorySlug)
        {
            return await _context.MenuItems
                                 .Include(m => m.Category)
                                 .Where(m => m.Category.Slug == categorySlug && m.IsAvailable)
                                 .ToListAsync();
        }*/
    }
}
