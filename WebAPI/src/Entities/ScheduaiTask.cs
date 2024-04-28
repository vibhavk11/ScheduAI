namespace WebAPI.Entities;

public class ScheduaiTask
{
    public int Id { get; set; }
    public string UserId { get; set; } = "";

    public DateTime CreateDate { get; set; }

    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public bool IsComplete { get; set; } = false;
    public decimal? StartTime { get; set; }
    public decimal? EndTime { get; set; }
    public decimal? DueTime { get; set; }
    public Priority Priority { get; set; } = Priority.Low;
    public int EstimatedTimeInHours { get; set; } = 0;
    public string? AIRecommendation { get; set; }

    public User User { get; set; } = null!;
}
