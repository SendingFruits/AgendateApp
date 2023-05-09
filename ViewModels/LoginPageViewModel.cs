using Agendate_App.Models;
using Agendate_App.Services;
using Agendate_App.Views;
using Android.Widget;
using CommunityToolkit.Mvvm.ComponentModel;
using Microsoft.Toolkit.Mvvm.Input;
using Newtonsoft.Json;

namespace Agendate_App.ViewModels
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



        [ICommand]
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

                await Shell.Current.GoToAsync($"//{nameof(HomePage)}");
            }
            else
            {
                var toast = Toast.MakeText("Credenciales Incorrectas", CommunityToolkit.Maui.Core.ToastDuration.Short, 12);
                void toast.Show();
            }
        }
    }
}