using WebAPI;
using WebAPI.Context;
using WebAPI.Entities;
using WebAPI.GraphQL.Schema.ScheduaiTasks.Inputs;

namespace WebAPI.GraphQL.Schema.ScheduaiTasks;

[MutationType]
public class ScheduaiTaskMutations()
{
    public async Task<ScheduaiTask> CreateScheduaiTaskAsync(
        [Service] ScheduaiTaskService ScheduaiTaskService,
        CreateScheduaiTaskInput input
    )
    {
        return await ScheduaiTaskService.CreateScheduaiTaskAsync(input);
    }
}
