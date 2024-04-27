using System.Reflection;
using Microsoft.EntityFrameworkCore;
using WebAPI.Attributes;
using WebAPI.Context;

namespace WebAPI.ServiceExtensions;

public static class ServiceExtensions
{
    public static IServiceCollection AddScheduaiDb(
        this IServiceCollection services,
        IConfiguration configuration,
        string connectionStringName = "DefaultConnection",
        string redisConnectionStringName = "Redis"
    )
    {
        var connectionString = configuration.GetConnectionString(connectionStringName);

        if (string.IsNullOrEmpty(connectionString))
        {
            throw new ArgumentException(
                $"Database Connection string {connectionStringName} is not set"
            );
        }

        services.AddDbContext<ScheduaiDbContext>(options =>
        {
            options.UseNpgsql(connectionString, o => o.UseNetTopologySuite());
        });

        services.AddDataServices();

        return services;
    }

    internal static IServiceCollection AddDataServices(this IServiceCollection services)
    {
        // Get types from the currently executing assembly
        var dataServiceTypes = Assembly
            .GetExecutingAssembly()
            .GetTypes()
            .Where(
                t =>
                    t.GetCustomAttribute<DataServiceAttribute>() is not null
                    && !t.IsAbstract
                    && !t.IsInterface
            );

        foreach (var type in dataServiceTypes)
        {
            Console.WriteLine(type.Name);

            // Assuming you want to add them as transient, but you can change this to Scoped or Singleton as required.
            services.AddScoped(type);
        }
        return services;
    }
}
