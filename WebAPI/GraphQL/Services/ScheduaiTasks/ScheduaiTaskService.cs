using Microsoft.EntityFrameworkCore;
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
            DueTime = input.DueTime,
            EndTime = input.DueTime + input.EstimatedTimeInHours,
            StartTime = DateTime.UtcNow.Hour,
        };

        _context.ScheduaiTasks.Add(scheduaiTask);
        await _context.SaveChangesAsync();

        return scheduaiTask;
    }

    public async Task<ICollection<ScheduaiTask>> GetScheduaiTasksByUserIdAsync(string userId)
    {
        return await _context
            .ScheduaiTasks
            .Where(st => st.UserId == userId && st.StartTime.HasValue)
            .ToListAsync();
    }
}
