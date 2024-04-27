using System;
using System.Net.Http;
using System.Threading.Tasks;

class Program
{
    static async Task Main(string[] args)
    {
        var httpClient = new HttpClient();
        var apiUrl = "http://localhost:5000/receive_data"; // URL of the Python server

        var requestData = new {"Hello"}; // Data to send
        var response = await httpClient.PostAsJsonAsync(apiUrl, requestData);

        if (response.IsSuccessStatusCode)
        {
            Console.WriteLine("Data sent successfully");
        }
        else
        {
            Console.WriteLine("Failed to send data: " + response.StatusCode);
        }
    }
}
