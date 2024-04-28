using WebAPI;
using WebAPI.Context;
using WebAPI.Entities;
using WebAPI.GraphQL.Schema.ScheduaiTasks.Inputs;
using WebAPI.GraphQL.Services.ScheduaiTasks;

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

    public async Task<bool> MarkTaskAsCompletedAsync(
        [Service] ScheduaiTaskService ScheduaiTaskService,
        int taskId,
        bool status
    )
    {
        return await ScheduaiTaskService.MarkTaskAsCompletedAsync(taskId, status);
    }
}
