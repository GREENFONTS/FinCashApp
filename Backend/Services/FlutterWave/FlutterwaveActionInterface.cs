namespace Bank_Apis.Services.FlutterWave
{
    public interface IFlutterwaveActionInterface
    {
        public Task<string> GetBillCategories(string UserId);

        public Task<string> BuyAirtime(string UserId, string customer, string amount);
    }
}
