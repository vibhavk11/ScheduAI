using System.Reflection;
using HotChocolate.AspNetCore;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using WebAPI.Context;
using WebAPI.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

builder
    .Services
    .AddGraphQLServer()
    .AllowIntrospection(builder.Environment.IsDevelopment())
    // .AddHttpRequestInterceptor<AuthHttpRequestInterceptor>()
    .AddQueryType(q => q.Name("Query"))
    .AddQueries()
    .AddMutationType(e => e.Name("Mutation"))
    .AddMutations()
    .AddMutationConventions()
    .InitializeOnStartup()
    .BindRuntimeType<uint, IntType>()
    .UseDefaultPipeline();

builder
    .Services
    .AddDbContext<ScheduaiDbContext>(
        options => options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
    );

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAuthentication();
builder.Services.AddAuthorization();

builder
    .Services
    .AddCors(options =>
    {
        options.AddPolicy(
            "AllowSpecificOrigin",
            builder =>
                builder
                    .WithOrigins("http://localhost:5173") // Allow your frontend URL
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials()
        );
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();

var summaries = new[]
{
    "Freezing",
    "Bracing",
    "Chilly",
    "Cool",
    "Mild",
    "Warm",
    "Balmy",
    "Hot",
    "Sweltering",
    "Scorching"
};

app.UseCors("AllowSpecificOrigin"); // Apply the CORS policy globally
app.UseAuthentication();
app.UseAuthorization();

app.MapGet(
        "/weatherforecast",
        () =>
        {
            var forecast = Enumerable
                .Range(1, 5)
                .Select(
                    index =>
                        new WeatherForecast(
                            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                            Random.Shared.Next(-20, 55),
                            summaries[Random.Shared.Next(summaries.Length)]
                        )
                )
                .ToArray();
            return forecast;
        }
    )
    .WithName("GetWeatherForecast")
    .WithOpenApi();

args.ToList().ForEach(x => Console.WriteLine(x));

if (Array.Exists(args, x => x.Contains("schema")))
{
    Console.WriteLine("Generating GraphQL Schema...");

    await app.RunWithGraphQLCommandsAsync(args);
    return;
}

Console.WriteLine("Starting GraphQL server...");

app.MapGraphQL().WithOptions(new GraphQLServerOptions { Tool = { Enable = true } });

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
