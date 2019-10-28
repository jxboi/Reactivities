using System;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Persistence;

namespace API
{
    public class Program
    {
        //static void Main (similar to how Console app) is the entry point to an application
        public static void Main(string[] args)
        {
            var host = CreateWebHostBuilder(args).Build();

            using (var scope = host.Services.CreateScope()){
                var services = scope.ServiceProvider;
                try{
                    var context = services.GetRequiredService<DataContext>();
                    context.Database.Migrate();

                    Seed.SeedData(context);
                }
                catch(Exception ex){
                    var logger =  services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occured during migration");
                }

                host.Run();
            }
            //CreateWebHostBuilder(args).Build().Run();
        }

        //IWebHostBuilder is the factory to create the web host 
        //creates default kestrel server, logging, and support for appsetting.json
        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();


        //.UseKestrel() > use Kestrel server
        //.UseContentRoot(Directory.GetCurrentDirectory() > use current directory as root
    }
}
