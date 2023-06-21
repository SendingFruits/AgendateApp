using AgendateApp.API.Services;
using AgendateApp.API.Services.Intefaces;
using AgendateApp.MVVM.Models;
using AgendateApp.MVVM.Views;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using Newtonsoft.Json;

namespace AgendateApp.MVVM.ViewModels
{
    public partial class RegisterPageViewModel : BaseViewModel
    {
        readonly IUsersServices serviceUser = new UsersServices();

        [ObservableProperty]
        private string username;
        [ObservableProperty]
        private string password;
        [ObservableProperty]
        private string firstname;
        [ObservableProperty]
        private string lastname;
        [ObservableProperty]
        private string email;
      
        [ObservableProperty]
        private string type; // empresa o cliente

        [ObservableProperty]
        private string docuType; // tipo de documento

        public RegisterPageViewModel() 
        {
            // ...
        }


        [RelayCommand]
        public async void Register()
        {
            if (!string.IsNullOrWhiteSpace(Username) 
             && !string.IsNullOrWhiteSpace(Password)
             && !string.IsNullOrWhiteSpace(Email)
             && !string.IsNullOrWhiteSpace(Firstname)
             && !string.IsNullOrWhiteSpace(Lastname)
            // && !string.IsNullOrWhiteSpace(Movil)
            ) {
                User newUser = new User
                {
                    Id = 1,
                    Username = Username,
                    Password = Password,
                    Email = Email,
                    Firstname = Firstname,
                    Lastname = Lastname,
                    Movil = "",
                    Longitud = 0,
                    Latitud = 0,
                };

                bool result = await serviceUser.Register(newUser);

                if (result == true)
                {
                    await Shell.Current.GoToAsync($"//{nameof(LoginPage)}");
                }
            }
            else
            {
                await Application.Current.MainPage.DisplayAlert("Mensaje", "Debe completar todos los datos", "Aceptar");
            }
        }
    }
}
