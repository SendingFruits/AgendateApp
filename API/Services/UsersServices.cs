using AgendateApp.MVVM.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Net.Http.Json;
using AgendateApp.API.Services.Intefaces;

namespace AgendateApp.API.Services
{
    public class UsersServices : IUsersServices
    {
        User usuario = new User
        {
            Id = 1,
            Username = "Admin",
            Password = "admin123",
            Longitud = -34.603722,
            Latitud = -58.38159,
        };

        HttpClient client = new HttpClient();
        string urlBase = "http://"; // metodo getUserLogin de la API



        public async Task<User> Login(string username, string password)
        {
            try
			{
				if (Connectivity.Current.NetworkAccess == NetworkAccess.Internet)
				{
                    // usuario = new Usuario();
                    // var url = $"{urlBase}/users/25";
                    // client.BaseAddress = new Uri(url);
                    // HttpResponseMessage response = await client.GetAsync(url);
                    // if (response.IsSuccessStatusCode)
                    // {
                    //	 usuario = await response.Content.ReadAsStringAsync<Usuario>();
                    //	 return await Task.FromResult(usuario);
                    // }
                    // else
                    // {
                    //	 return null;
                    // }

                    if (username == usuario.Username && password == usuario.Password)
                    {
                        JsonSerializerOptions serializer = new JsonSerializerOptions
                        {
                            WriteIndented = true,
                        };
                        return await Task.FromResult(usuario);
                    }
                    else
                    {
                        await Application.Current.MainPage.DisplayAlert(
                            "Error de inicio de sesión", 
                            "Credenciales incorrectas", 
                            "OK");
                        return null;
                    }
                }
                else
                {
                    await Application.Current.MainPage.DisplayAlert(
                        "Error de conexión", 
                        "No hay conexión a Internet", 
                        "OK");
                    return null;
                }

            }
			catch (Exception)
			{
				throw new Exception("Error al querer loguear");
			}
        }

        public async Task<User> Register(User userData)
        {
            try
            {
                if (Connectivity.Current.NetworkAccess == NetworkAccess.Internet)
                {
                    if (userData != null)
                    {
                        usuario = new User
                        {
                            Id = 2,
                            Username = userData.Username,
                            Password = userData.Password,
                            Longitud = userData.Longitud,
                            Latitud = userData.Latitud,
                        };

                        JsonSerializerOptions serializer = new JsonSerializerOptions
                        {
                            WriteIndented = true,
                        };
                        return await Task.FromResult(usuario);
                    }
                    else
                    {
                        await Application.Current.MainPage.DisplayAlert(
                            "Error de registro",
                            "Credenciales incorrectas",
                            "OK");
                        return null;
                    }
                }
                else
                {
                    await Application.Current.MainPage.DisplayAlert(
                        "Error de conexión",
                        "No hay conexión a Internet",
                        "OK");
                    return null;
                }

            }
            catch (Exception)
            {
                throw new Exception("Error al querer registrarse");
            }
        }
    }
}