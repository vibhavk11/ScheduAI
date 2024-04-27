namespace WebAPI.Entities;

public class User
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Username { get; set; } = "";
    public string Email { get; set; } = "";

    public ICollection<ScheduaiTask> Tasks { get; set; } = [];
}
