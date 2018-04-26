using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using System.Text;
using Newtonsoft.Json;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;

using aspnetmvc_angular_sample.Models;
using Microsoft.AspNetCore.Http;

namespace aspnetmvc_angular_sample
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();

			// Add ASP.NET Identity support
			//services.AddIdentity<UserData, IdentityRole>(
			//opts =>
			//{
			//  opts.Password.RequireDigit = true;
			//  opts.Password.RequireLowercase = true;
			//  opts.Password.RequireUppercase = true;
			//  opts.Password.RequireNonAlphanumeric = false;
			//  opts.Password.RequiredLength = 7;
			//});

			// Add Authentication with JWT Tokens
			services.AddAuthentication(opts =>
			{
				opts.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
				opts.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
				opts.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
			})
			.AddJwtBearer(cfg =>
			{
				cfg.RequireHttpsMetadata = false;
				cfg.SaveToken = true;
				cfg.TokenValidationParameters = new TokenValidationParameters()
				{
					// standard configuration
					ValidIssuer = Configuration["Auth:Jwt:Issuer"],
					ValidAudience = Configuration["Auth:Jwt:Audience"],
					IssuerSigningKey = new SymmetricSecurityKey(
					Encoding.UTF8.GetBytes(Configuration["Auth:Jwt:Key"])),
					ClockSkew = TimeSpan.Zero,

					// security switches
					ValidateIssuer = true,
					ValidateAudience = true,
					RequireExpirationTime = true,
					ValidateIssuerSigningKey = true
				};
			});

			//
			services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
			{
				builder.AllowAnyOrigin()
					   .AllowAnyMethod()
					   .AllowAnyHeader()
					   .AllowCredentials();
			}));

		}

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {

            //Add the AuthenticationMiddleware to the pipeline
            app.UseAuthentication();

            app.Use(async (context, next) =>
            {
                await next();
                if (context.Response.StatusCode == 404 &&
                    !Path.HasExtension(context.Request.Path.Value) &&
                    !context.Request.Path.Value.StartsWith("/api/"))
                {
                  context.Request.Path = "/index.html";
                  await next();
                }

				//
				//if (context.Request.Path.Value.Contains("api/"))
				//{
				//	context.Request.Path = "http://dev-net-brn.MIG.local/MigAuthService/api/BusinessClass";
				//	await next();
				//}


			});

			//app.Run(async context =>
			//{
			//	await context.Response.WriteAsync("Hello, World!");
			//});

			//
			app.UseMvcWithDefaultRoute();
            app.UseDefaultFiles();
            app.UseStaticFiles();

            // Create a service scope to get an ApplicationDbContext instance using DI
            //using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            //{ 
            //  var roleManager = serviceScope.ServiceProvider.GetService<RoleManager<IdentityRole>>();
            //  var userManager = serviceScope.ServiceProvider.GetService<UserManager<UserData>>();
            //}

            //if (env.IsDevelopment())
            //{
            //    app.UseDeveloperExceptionPage();
            //}
            //else
            //{
            //    app.UseExceptionHandler("/Home/Error");
            //}

            //app.UseStaticFiles();

            //app.UseMvc(routes =>
            //{
            //    routes.MapRoute(
            //        name: "default",
            //        template: "{controller=Home}/{action=Index}/{id?}");
            //});

        }
    }
}
