using WebAPI.Entities;

namespace WebAPI.GraphQL.Schema.Enums;

[QueryType]
public class EnumQueries
{
    public Dictionary<Priority, int> GetPriorities()
    {
        int i = 1;
        var enums = Enum.GetValues(typeof(Priority)).Cast<Priority>().ToList();

        return enums.ToDictionary(e => e, e => i++);
    }
}
