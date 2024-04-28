using WebAPI.Entities;
using WebAPI.GraphQL.Schema.ScheduaiTasks.Inputs;

namespace WebAPI.GraphQL.Schema.ScheduaiTasks;

[QueryType]
public class ScheduaiTaskQueries()
{
    public async Task<ICollection<ScheduaiTask>> GetScheduaiTasksByIdAsync(
        [Service] ScheduaiTaskService ScheduaiTaskService,
        string id
    )
    {
        return await ScheduaiTaskService.GetScheduaiTasksByUserIdAsync(id);
    }
}
