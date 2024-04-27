using System.Text;
using HotChocolate.Resolvers;

namespace WebAPI.GraphQL.Schema.Test;

[MutationType]
public class TestMutation(ILogger<TestMutation> logger)
{
    public string Test(string input, IResolverContext context)
    {
        return "Hello World";
    }
}
