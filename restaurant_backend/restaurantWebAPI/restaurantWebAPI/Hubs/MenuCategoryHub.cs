using Microsoft.AspNetCore.SignalR;
using restaurantWebAPI.DTOs;
using System.Threading.Tasks;

namespace restaurantWebAPI.Hubs
{
    public class MenuCategoryHub : Hub
    {
        public async Task RequestMenuUpdate()
        {
            await Clients.Caller.SendAsync("ReceiveMenuUpdate", "Please call API to get latest data");
        }

        public async Task BroadcastMenuUpdate(IEnumerable<CategoryDto> updatedCategories)
        {
            await Clients.All.SendAsync("ReceiveMenuUpdate", updatedCategories);
        }
    }
}