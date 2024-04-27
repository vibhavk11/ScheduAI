using WebAPI.Entities;
using WebAPI.GraphQL.Schema.Users.Inputs;
using WebAPI.GraphQL.Services.Users;

namespace WebAPI.GraphQL.Schema.Users;

[QueryType]
public class UserQueries()
{
    public async Task<User> GetUserByIdAsync(
        [Service] UserService userService,
        CreateUserInput input
    )
    {
        return await userService.GetUserByIdAsync(input);
    }
}
