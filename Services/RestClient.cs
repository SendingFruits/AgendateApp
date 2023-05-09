using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Agendate_App.Services
{
    public class RestClient
    {
        private readonly HttpClient _httpClient;
        private readonly string _baseUri;

        public RestClient(string baseUri)
        {
            _httpClient = new HttpClient();
            _baseUri = baseUri;
        }

        public async Task<TResponse> Post<TRequest, TResponse>(string method, TRequest request)
        {
            var requestUri = $"{_baseUri}?method={method}";

            var httpRequest = new HttpRequestMessage(HttpMethod.Post, requestUri);

            httpRequest.Content = new StringContent(
                JsonSerializer.Serialize(request),
                System.Text.Encoding.UTF8,
                "application/json"
            );

            var httpResponse = await _httpClient.SendAsync(httpRequest);

            if (!httpResponse.IsSuccessStatusCode)
            {
                throw new Exception($"Request failed with status code {httpResponse.StatusCode}");
            }

            var responseString = await httpResponse.Content.ReadAsStringAsync();

            return JsonSerializer.Deserialize<TResponse>(responseString);
        }

        public void SetHeader(string name, string value)
        {
            _httpClient.DefaultRequestHeaders.Add(name, value);
        }
    }
}
