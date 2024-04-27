using WebAPI.Entities;

namespace WebAPI.GraphQL.Schema.ScheduaiTasks.Inputs;

public class CreateScheduaiTaskInput
{
    public string UserId { get; set; } = "";
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public int EstimatedTimeInHours { get; set; } = 0;
    public Priority Priority { get; set; } = Priority.Low;
    public DateTime DueDate { get; set; } = DateTime.Now;
}