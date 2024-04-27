using System.Reflection;
using Microsoft.EntityFrameworkCore;
using WebAPI.Entities;

namespace WebAPI.Context;

public class ScheduaiDbContext(DbContextOptions<ScheduaiDbContext> options) : DbContext(options)
{
    public DbSet<User> Users { get; set; } = null!;
    public DbSet<ScheduaiTask> ScheduaiTasks { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Setup all enitity configurations
        ApplyConfigurations(modelBuilder);

#pragma warning disable S6605 // Collection-specific "Exists" method should be used instead of the "Any" extension
        // GetInterfaces() returns an array which doesn't have an Exists method. Changing to ToList() will
        // eliminate the warning, but there is no perf gain.

        // Apply all configurations using reflection
        var typeToRegister = Assembly
            .GetExecutingAssembly()
            .GetTypes()
            .Where(
                t =>
                    !t.IsAbstract
                    && !t.IsGenericTypeDefinition
                    && t.GetInterfaces()
                        .Any(
                            gi =>
                                gi.IsGenericType
                                && gi.GetGenericTypeDefinition()
                                    == typeof(IEntityTypeConfiguration<>)
                        )
            )
            .ToList();

#pragma warning restore S6605 // Collection-specific "Exists" method should be used instead of the "Any" extension

        foreach (var type in typeToRegister)
        {
            dynamic configurationInstance = Activator.CreateInstance(type)!;
            modelBuilder.ApplyConfiguration(configurationInstance);
        }
    }

    private void ApplyConfigurations(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>().HasKey(x => x.Id);

        modelBuilder.Entity<ScheduaiTask>().HasKey(x => x.Id);

        modelBuilder
            .Entity<ScheduaiTask>()
            .HasOne(x => x.User)
            .WithMany(x => x.Tasks)
            .HasForeignKey(x => x.UserId);
    }
}
