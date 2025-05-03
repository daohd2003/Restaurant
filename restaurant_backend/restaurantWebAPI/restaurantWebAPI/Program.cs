
using Microsoft.EntityFrameworkCore;
using restaurantWebAPI.Data;
using restaurantWebAPI.Hubs;
using restaurantWebAPI.Mapper;
using restaurantWebAPI.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi.Models;
using restaurantWebAPI.Configuration;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace restaurantWebAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // JWT Authentication
            var jwtKey = builder.Configuration["Jwt:Key"];
            var jwtIssuer = builder.Configuration["Jwt:Issuer"];
            var jwtAudience = builder.Configuration["Jwt:Audience"];

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false; // ⚠️ BẮT BUỘC dùng HTTPS trong production
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtIssuer,
                    ValidAudience = jwtAudience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
                    ClockSkew = TimeSpan.Zero // Không cho phép thời gian trễ
                };
            });

            // Add services to the container.
            builder.Services.AddDbContext<RestaurantDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("RestaurantDatabase")));

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp", policy =>
                {
                    policy.WithOrigins("http://localhost:3000")
                          .AllowAnyHeader()
                          .AllowAnyMethod()
                          .AllowCredentials();
                });
            });

            builder.Services.AddScoped<ICategoryService, CategoryService>();
            builder.Services.AddScoped<IMenuService, MenuService>();
            builder.Services.AddScoped<IUserService, UserService>();
            builder.Services.AddScoped<IAzureBlobStorageService, AzureBlobStorageService>();
            builder.Services.AddScoped<JwtService>();

            builder.Services.AddAutoMapper(typeof(MappingProfile));
            builder.Services.AddSignalR();

            // Cấu hình Azure Storage
            builder.Services.Configure<AzureStorageSettings>(builder.Configuration.GetSection("AzureStorage"));

            // Đăng ký Cloudinary
            var cloudinaryConfig = builder.Configuration.GetSection("Cloudinary");
            var account = new Account(
                cloudinaryConfig["CloudName"],
                cloudinaryConfig["ApiKey"],
                cloudinaryConfig["ApiSecret"]
            );
            var cloudinary = new Cloudinary(account);
            builder.Services.AddSingleton(cloudinary);

            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "Restaurant API",
                    Version = "v1",
                    Description = "API for Restaurant app with JWT authentication"
                });

                // ✅ Định nghĩa lược đồ xác thực JWT
                var jwtSecurityScheme = new OpenApiSecurityScheme
                {
                    Scheme = "bearer",
                    BearerFormat = "JWT",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Description = "Nhập token theo định dạng: Bearer {your JWT token}",

                    Reference = new OpenApiReference
                    {
                        Id = "Bearer",
                        Type = ReferenceType.SecurityScheme
                    }
                };

                // ⚙️ Thêm lược đồ vào Swagger
                c.AddSecurityDefinition(jwtSecurityScheme.Reference.Id, jwtSecurityScheme);

                // 🔒 Yêu cầu bảo mật cho tất cả các endpoint [Authorize]
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                    {
                        { jwtSecurityScheme, Array.Empty<string>()
                    }
                });
            });


            builder.Services.AddHttpContextAccessor();

            var app = builder.Build();

            app.UseCors("AllowReactApp");
            app.UseAuthentication();
            app.UseAuthorization();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            /*app.UseSwagger();
            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/swagger/v1/swagger.json", "Restaurant API");
                options.RoutePrefix = string.Empty;
            }
            );*/

            
            app.UseHttpsRedirection();

            app.MapHub<MenuCategoryHub>("/menuCategoryHub");

            app.MapControllers();

            app.Run();
        }
    }
}
