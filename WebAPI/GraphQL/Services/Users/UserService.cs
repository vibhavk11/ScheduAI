using Microsoft.EntityFrameworkCore;
using WebAPI.Attributes;
using WebAPI.Context;
using WebAPI.Entities;
using WebAPI.GraphQL.Schema.Users.Inputs;

namespace WebAPI.GraphQL.Services.Users;

[DataService]
public class UserService(ScheduaiDbContext context)
{
    private readonly ScheduaiDbContext _context =
        context ?? throw new ArgumentNullException(nameof(context));

    internal async Task<User> CreateUserAsync(CreateUserInput input)
    {
        var user = new User
        {
            Id = input.Id,
            Username = input.Username,
            Email = input.Email
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return user;
    }

    public async Task<User> GetUserByIdAsync(CreateUserInput input)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == input.Id);

        if (user is null)
        {
            user = await CreateUserAsync(input);
        }

        return user;
    }
}
