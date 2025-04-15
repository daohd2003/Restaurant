using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace restaurantWebAPI.Data
{
    public class RestaurantDbContextFactory : IDesignTimeDbContextFactory<RestaurantDbContext>
    {
        public RestaurantDbContext CreateDbContext(string[] args)
        {
            IConfiguration configurationRoot = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            var connectionString = configurationRoot.GetConnectionString("RestaurantDatabase");

            var optionsBuilder = new DbContextOptionsBuilder<RestaurantDbContext>();
            optionsBuilder.UseSqlServer(connectionString);

            return new RestaurantDbContext(optionsBuilder.Options);
        }
    }
}
