using AutoMapper;
using restaurantWebAPI.DTOs;
using restaurantWebAPI.Models;

namespace restaurantWebAPI.Mapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Category, CategoryDto>().ReverseMap();
            CreateMap<MenuItem, MenuItemDto>().ReverseMap();
        }
    }
}
