namespace WebAPI.Entities;

public class ScheduaiTask
{
    public int Id { get; set; }
    public string UserId { get; set; } = "";

    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public bool IsComplete { get; set; } = false;
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public DateTime? DueDate { get; set; }
    public int Priority { get; set; } = 0;
    public int EstimatedTimeInHours { get; set; } = 0;
    public string? AIRecommendation { get; set; }
    public User User { get; set; } = null!;
}
