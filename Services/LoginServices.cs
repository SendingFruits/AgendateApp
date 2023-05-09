using Agendate_App.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Net.Http.Json;

namespace Agendate_App.Services
{
    public class LoginServices : ILoginServices
    {
        //Ubicacion ubicacion = new Ubicacion
        //{
        //    Longitud = -34.603722,
        //    Latitud = -58.381592
        //};

        Usuario usuario;
        HttpClient client;
        JsonSerializerOptions serializer;

        string urlBase = "http://";

        public async Task<Usuario> Login(string username, string password)
        {
			try
			{
				if (Connectivity.Current.NetworkAccess == NetworkAccess.Internet)
				{
					//usuario = new Usuario();

                    usuario = new Usuario
                    {
                        Id = 1,
                        Username = "Admin",
                        Password = "admin123"
                    };

                    client = new HttpClient();

                    var url = $"{urlBase}/users/25";

                    //client.BaseAddress = new Uri(url);
                    //HttpResponseMessage response = await client.GetAsync(url);
                    //if (response.IsSuccessStatusCode)
                    //{
                    //	usuario = await response.Content.ReadAsStringAsync<Usuario>();
                    //	return await Task.FromResult(usuario);
                    //}
                    //else
                    //{
                    //	return null;
                    //}

                    

                    serializer = new JsonSerializerOptions
                    {
                        WriteIndented = true,
                    };

                    return await Task.FromResult(usuario);
                }
                else
                {
                    //App.Current.Dspla
                    return null;
                }

            }
			catch (Exception)
			{
				throw;
			}
        }
    }
}
