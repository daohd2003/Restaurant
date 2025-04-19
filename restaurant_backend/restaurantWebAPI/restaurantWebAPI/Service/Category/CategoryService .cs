using AutoMapper;
using Microsoft.EntityFrameworkCore;
using restaurantWebAPI.Data;
using restaurantWebAPI.DTOs;
using restaurantWebAPI.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace restaurantWebAPI.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly RestaurantDbContext _context;
        private readonly IMapper _mapper;

        public CategoryService(RestaurantDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<Category>> GetAllCategoriesAsync()
        {
            return await _context.Categories.Where(c => c.IsActive).ToListAsync();
        }

        public async Task<Category> GetCategoryByIdAsync(int id)
        {
            return await _context.Categories.FindAsync(id);
        }

        public async Task<Category> CreateCategoryAsync(Category category)
        {
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
            return category;
        }

        public async Task<Category> UpdateCategoryAsync(int id, Category category)
        {
            var existingCategory = await _context.Categories.FindAsync(id);
            if (existingCategory == null) return null;

            existingCategory.Name = category.Name;
            existingCategory.Slug = category.Slug;
            existingCategory.DisplayOrder = category.DisplayOrder;
            existingCategory.IsActive = category.IsActive;

            await _context.SaveChangesAsync();
            return existingCategory;
        }

        public async Task<bool> DeleteCategoryAsync(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null) return false;

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<CategoryDto>> GetAllWithMenuItemsAsync()
        {
            var categories = await _context.Categories
                .Include(c => c.MenuItems)
                .OrderBy(c => c.DisplayOrder)
                .ToListAsync();

            foreach (var category in categories)
            {
                category.MenuItems = category.MenuItems
                    .Where(m => m.IsAvailable && m.IsFeatured)
                    .OrderBy(m => m.Name)
                    .ToList();
            }

            return _mapper.Map<IEnumerable<CategoryDto>>(categories);
        }
    }
}
