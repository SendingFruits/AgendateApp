using AgendateApp.MVVM.Models;
using AgendateApp.API.Services.Intefaces;
using System.Diagnostics;
using Newtonsoft.Json;

namespace AgendateApp.API.Services
{
    public class UsersServices : IUsersServices
    {
        public List<User> users = new List<User>();
        public List<Company> companies = new List<Company>();
        public List<Customer> customers = new List<Customer>();

        HttpClient client = new HttpClient();
        string urlBase = "http://"; // metodo getUserLogin de la API

        public UsersServices()
        {
            User u = null;
            for (int i=0; i<3; i++)
            {
                if (i == 0)
                {
                    u = new User
                    {
                        Id = 1,
                        Username = "Admin",
                        Password = "admin123",
                        Email = "admin.app@gmail.com",
                        Firstname = "Administrador",
                        Lastname = "App",
                        Movil = "456789",
                        Longitud = -34.603722,
                        Latitud = -58.38159,
                    };
                }
                else
                {
                    u = new User
                    {
                        Id = i+1,
                        Username = "Usuario" + (i + 1),
                        Password = "Usuario" + (i + 1),
                        Email = "usuario" + (i + 1) + "@gmail.com",
                        Firstname = "Nombre Usuario " + (i + 1),
                        Lastname = "Apellido Usuario " + (i + 1),
                        Movil = "123456789" + (i + 1),
                        Longitud = -34.603722 * (i + 1),
                        Latitud = -58.38159 * (i + 1),
                    };
                }
                users.Add(u);
            }
        }

        public async Task<User> Login(string username, string password)
        {
            try
			{
				if (Connectivity.Current.NetworkAccess == NetworkAccess.Internet)
				{
                    User userResult = null;

                    foreach (User user in users)
                    {
                        Debug.WriteLine("user in for: " + user.Firstname.ToString());

                        if (username == user.Username && password == user.Password)
                        {
                            Debug.WriteLine("username: " + username.ToString());
                            userResult = user;
                            break;
                        }
                    }

                    //Debug.WriteLine("userResult: " + JsonConvert.SerializeObject(userResult));
                    if (userResult != null)
                    {
                        return await Task.FromResult(userResult);
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
			catch (Exception ex)
			{
				throw new Exception("Error al querer loguear " + ex);
			}
        }

        public async Task<bool> Register(User userData)
        {
            Debug.WriteLine("userData: " + JsonConvert.SerializeObject(userData));

            try
            {
                if (Connectivity.Current.NetworkAccess == NetworkAccess.Internet)
                {
                    if (userData != null)
                    {
                        User newUser = new User
                        {
                            Id = users.Count + 1,
                            Username = userData.Username,
                            Password = userData.Password,
                            Email = userData.Email,
                            Firstname = userData.Firstname,
                            Lastname = userData.Lastname,
                            Movil = userData.Movil,
                            Longitud = userData.Longitud,
                            Latitud = userData.Latitud,
                        };
                        users.Add(newUser);

                        return await Task.FromResult(true);
                    }
                    else
                    {
                        await Application.Current.MainPage.DisplayAlert(
                            "Error de registro",
                            "Datos incorrectos",
                            "OK");
                        return false;
                    }
                }
                else
                {
                    await Application.Current.MainPage.DisplayAlert(
                        "Error de conexión",
                        "No hay conexión a Internet",
                        "OK");
                    return false;
                }

            }
            catch (Exception ex)
            {
                throw new Exception("Error al intentar registrarse " + ex);
            }
        }
    }
}