using System.Text;
using HotChocolate.Resolvers;

namespace WebAPI.GraphQL.Schema.Test;

[QueryType]
public class TestQueries(ILogger<TestQueries> logger)
{
    public string Test(IResolverContext context)
    {
        return "Hello World";
    }
}
