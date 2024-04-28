using Microsoft.EntityFrameworkCore;
using Mscc.GenerativeAI;
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
            CreateDate = DateTime.UtcNow,
            Description = input.Description,
            EstimatedTimeInHours = input.EstimatedTimeInHours,
            DueTime = input.DueTime,
            EndTime = input.DueTime + input.EstimatedTimeInHours,
            StartTime = input.StartTime,
        };

        _context.ScheduaiTasks.Add(scheduaiTask);
        await _context.SaveChangesAsync();
        string taskDescription = scheduaiTask.Description;
        var prompt =
            "give me advice on how to "
            + taskDescription
            + " keep the response under 250 characters";

        var googleAI = new GoogleAI(apiKey: "AIzaSyA1PbjBnaPlXojF-hESNZGO7awb8WnjgmQ");
        var model = googleAI.GenerativeModel(model: Model.GeminiPro);
        var response = model.GenerateContent(prompt).Result;

        scheduaiTask.AIRecommendation = response.Text;
        await _context.SaveChangesAsync();

        return scheduaiTask;
    }

    public async Task<ICollection<ScheduaiTask>> GetScheduaiTasksByUserIdAsync(string userId)
    {
        return await _context
            .ScheduaiTasks
            .Where(
                st =>
                    st.UserId == userId
                    && st.StartTime.HasValue
                    && st.CreateDate.Date == DateTime.UtcNow.Date
            )
            .ToListAsync();
    }
}
