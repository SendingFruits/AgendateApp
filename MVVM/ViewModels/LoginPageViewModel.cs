using AgendateApp.Models;
using AgendateApp.Services;
using AgendateApp.Views;
using System.Diagnostics;

using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using Newtonsoft.Json;

namespace AgendateApp.ViewModels
{
    public partial class LoginPageViewModel : BaseViewModel
    {
        [ObservableProperty]
        private string username;

        [ObservableProperty]
        private string password;


        public Usuario User { get; set; }

        public LoginPageViewModel()
        {

        }


        readonly ILoginServices serviceLogin = new LoginServices();



        [RelayCommand]
        public async void Login()
        {
            if (!string.IsNullOrWhiteSpace(Username) && !string.IsNullOrWhiteSpace(Password))
            {
                Usuario userCredentials = await serviceLogin.Login(Username, Password);

                if (Preferences.ContainsKey(nameof(App.userCredentials)))
                {
                    Preferences.Remove(nameof(App.userCredentials));
                }

                string userDetails = JsonConvert.SerializeObject(userCredentials);
                Preferences.Set(nameof(App.userCredentials), userDetails);
                App.userCredentials = userCredentials;

                AppShell.Current.FlyoutHeader = new FlyoutUserControl();

                //Debug.WriteLine(Current);
                await Shell.Current.GoToAsync($"//{nameof(MainPage)}");
            }
            else
            {
                //var toast = Toast.MakeText("Credenciales Incorrectas", CommunityToolkit.Maui.Core.ToastDuration.Short, 12);
                //void toast.Show();
            }
        }
    }
}