namespace WebAPI.GraphQL.Schema.Users.Inputs
{
    public class CreateUserInput
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Username { get; set; } = "";
        public string Email { get; set; } = "";
    }
}
