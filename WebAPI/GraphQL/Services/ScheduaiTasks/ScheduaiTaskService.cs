using Microsoft.EntityFrameworkCore;
using Mscc.GenerativeAI;
using WebAPI.Attributes;
using WebAPI.Context;
using WebAPI.Entities;
using WebAPI.GraphQL.Schema.ScheduaiTasks.Inputs;

namespace WebAPI.GraphQL.Services.ScheduaiTasks;

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
            EndTime = input.StartTime is not null
                ? input.StartTime + input.EstimatedTimeInHours
                : null,
            StartTime = input.StartTime,
        };

        string taskDescription = scheduaiTask.Description;
        var prompt =
            "give me advice on how to "
            + taskDescription
            + " keep the response under 250 characters. Format the response as basic html.";

        var googleAI = new GoogleAI(apiKey: "AIzaSyA1PbjBnaPlXojF-hESNZGO7awb8WnjgmQ");
        var model = googleAI.GenerativeModel(model: Model.GeminiPro);
        var response = model.GenerateContent(prompt).Result;
        scheduaiTask.AIRecommendation = response.Text;

        if (input.StartTime is null)
        {
            var dueDate = scheduaiTask.DueTime;
            var timeToComplete = scheduaiTask.EstimatedTimeInHours;
            DateTime utcTime = DateTime.UtcNow;
            TimeZoneInfo cstZone = TimeZoneInfo.FindSystemTimeZoneById("America/Los_Angeles");
            DateTime cstTime = TimeZoneInfo.ConvertTimeFromUtc(utcTime, cstZone);
            string g = cstTime.ToString("HH:mm"); // for 24hr format

            var x = dueDate % 1;
            int seconds = (int)(60 * x);
            int intTime = (int)dueDate;
            string dueTime = intTime + ":" + seconds;
            prompt =
                dueTime
                + ". This is the due date of a task in military time."
                + " It will take "
                + timeToComplete
                + " hours to complete. "
                + "The current time in military time is "
                + g
                + ". When should i start and end this task, just give me the end and start times nothing else";
            response = model.GenerateContent(prompt).Result;

            string start = string.Empty;
            string end = string.Empty;

            string endSubString = response.Text.Substring(response.Text.Length / 2 + 2);
            string startSubString = response.Text.Substring(0, response.Text.Length / 2 + 1);

            for (int i = 0; i < startSubString.Length; i++)
            {
                if (Char.IsDigit(startSubString[i]))
                    start += startSubString[i];
            }
            for (int i = 0; i < endSubString.Length; i++)
            {
                if (Char.IsDigit(endSubString[i]))
                    end += endSubString[i];
            }
            if (start.Length == 3)
            {
                start = start.Insert(1, ".");
            }
            if (end.Length == 3)
            {
                end = end.Insert(1, ".");
            }
            if (start.Length == 4)
            {
                start = start.Insert(2, ".");
            }
            if (end.Length == 4)
            {
                end = end.Insert(2, ".");
            }
            decimal endDecimal = Decimal.Parse(end);
            decimal startDecimal = Decimal.Parse(start);
            decimal endDecimalFraction = endDecimal - Math.Truncate(endDecimal);
            decimal startDecimalFraction = startDecimal - Math.Truncate(startDecimal);
            endDecimal -= endDecimalFraction;
            startDecimal -= startDecimalFraction;
            endDecimalFraction = endDecimalFraction * 100 / 60;
            startDecimalFraction = startDecimalFraction * 100 / 60;
            endDecimal += endDecimalFraction;
            startDecimal += startDecimalFraction;

            scheduaiTask.EndTime = endDecimal;
            scheduaiTask.StartTime = startDecimal;
        }
        _context.ScheduaiTasks.Add(scheduaiTask);
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

    public async Task<bool> MarkTaskAsCompletedAsync(int taskId, bool status)
    {
        var task = await _context.ScheduaiTasks.FirstOrDefaultAsync(x => x.Id == taskId);

        if (task is null)
            throw new Exception("Task not found");

        task.IsComplete = status;
        await _context.SaveChangesAsync();

        return true;
    }
}
