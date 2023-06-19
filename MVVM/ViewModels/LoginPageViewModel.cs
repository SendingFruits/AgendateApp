using AgendateApp.API.Services;
using AgendateApp.MVVM.Models;
using AgendateApp.MVVM.Views;

using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using Newtonsoft.Json;
using AgendateApp.API.Services.Intefaces;

namespace AgendateApp.MVVM.ViewModels
{
    public partial class LoginPageViewModel : BaseViewModel
    {
        readonly IUsersServices serviceUser = new UsersServices();

        [ObservableProperty]
        private string username;
        [ObservableProperty]
        private string password;


        public LoginPageViewModel()
        {
            // ...
        }

        [RelayCommand]
        public async void Login()
        {
            if (!string.IsNullOrWhiteSpace(Username) && !string.IsNullOrWhiteSpace(Password))
            {
                User userCredentials = await serviceUser.Login(Username, Password);

                if (Preferences.ContainsKey(nameof(App.userCredentials)))
                {
                    Preferences.Remove(nameof(App.userCredentials));
                }

                string userDetails = JsonConvert.SerializeObject(userCredentials);

                Preferences.Set(nameof(App.userCredentials), userDetails);
                App.userCredentials = userCredentials;
                AppShell.Current.FlyoutHeader = new FlyoutUserControl();

                if (userCredentials != null)
                {
                    await Shell.Current.GoToAsync($"//{nameof(MainPage)}");
                }
            }
            else
            {
                await Application.Current.MainPage.DisplayAlert("Mensaje", "Credenciales incorrectas", "Aceptar");
            }
        }


        [RelayCommand]
        public async void Register()
        {
            await Shell.Current.GoToAsync(nameof(RegisterPage));   
         
        }
    }
}