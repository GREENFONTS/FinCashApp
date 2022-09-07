using Bank_Apis.Model;
using Newtonsoft.Json;
using System.Net.Http.Headers;

namespace Bank_Apis.Services.FlutterWave
{
    public class FlutterwaveAccountActions : IFlutterwaveActionInterface
    {
        private readonly HttpClient _client;
        private  string _apiKey;
        private readonly DatabaseContext _dbclient;
        private readonly FlutterWave _clientSetup = new();

        public FlutterwaveAccountActions(DatabaseContext dbclient)
        {
            _client = new HttpClient();
            _apiKey = "";
            _dbclient = dbclient;
        }

    
        public async Task<string> GetBillCategories(string UserId)
        {
            _apiKey = _clientSetup.GetFlutterKey(_dbclient, UserId);
            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _apiKey);

            var res = await _client.GetAsync("https://api.flutterwave.com/v3/bill-categories");
            var result = await res.Content.ReadAsStringAsync();
            
            return result;
        }

        public async Task<string> BuyAirtime(string UserId, string customer, string amount)
        {
            _apiKey = _clientSetup.GetFlutterKey(_dbclient, UserId);
            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _apiKey);
            _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var reference = Guid.NewGuid().ToString();
            var formBody = new FormUrlEncodedContent(new[]
           {
                new KeyValuePair<string, string>("country", "NG"),
                new KeyValuePair<string, string>("customer", customer),
                new KeyValuePair<string, string>("amount", amount),
                new KeyValuePair<string, string>("type", "AIRTIME"),
                new KeyValuePair<string, string>("reference", reference),
                new KeyValuePair<string, string>("recurrence", "ONCE")
            });

            var res = await _client.PostAsync("https://api.flutterwave.com/v3/bills", formBody);
            if (res.IsSuccessStatusCode)
            {
                var result = await res.Content.ReadAsStringAsync();
                Console.WriteLine(result);
            }
            Console.WriteLine(res);
            return "";
        }
    }
}
