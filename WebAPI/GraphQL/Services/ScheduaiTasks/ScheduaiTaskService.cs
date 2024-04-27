using WebAPI.Attributes;
using WebAPI.Context;
using WebAPI.Entities;
using WebAPI.GraphQL.Schema.ScheduaiTasks.Inputs;

[DataService]
public class ScheduaiTaskService(ScheduaiDbContext context)
{
    private readonly ScheduaiDbContext _context =
        context ?? throw new ArgumentNullException(nameof(context));

    public async Task<ScheduaiTask> CreateScheduaiTaskAsync(CreateScheduaiTaskInput input)
    {
        var scheduaiTask = new ScheduaiTask
        {
            UserId = input.UserId,
            Title = input.Title,
            Description = input.Description,
            EstimatedTimeInHours = input.EstimatedTimeInHours,
            DueDate = input.DueDate,
            StartDate = DateTime.UtcNow,
        };

        _context.ScheduaiTasks.Add(scheduaiTask);
        await _context.SaveChangesAsync();

        return scheduaiTask;
    }
}
