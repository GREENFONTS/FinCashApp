using Bank_Apis.Model;

namespace Bank_Apis.Services.FlutterWave
{
    public class FlutterWave
    {
        public string GetFlutterKey(DatabaseContext _client, string UserId)
        {
            var Key = _client.ServiceKeys.FirstOrDefault(x => x.UserId == UserId)!;
            return Key.FlutterKey;
        }
    }
}
