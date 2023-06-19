using AgendateApp.MVVM.Views;
using CommunityToolkit.Mvvm.Input;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

namespace AgendateApp.MVVM.ViewModels
{
    public partial class AppShellViewModel : BaseViewModel
    {
        //public ICommand SignOutCommand { get; private set; }

        public AppShellViewModel()
        {
            //SignOutCommand = new RelayCommand(async () =>
            //{
            //    if (Preferences.ContainsKey(nameof(App.userCredentials)))
            //    {
            //        Preferences.Remove(nameof(App.userCredentials));
            //    }
            //    await Shell.Current.GoToAsync($"//{nameof(LoginPage)}");
            //});
        }

        [RelayCommand]
        async void SignOut()
        {
            if (Preferences.ContainsKey(nameof(App.userCredentials)))
            {
                Preferences.Remove(nameof(App.userCredentials));
            }
            await Shell.Current.GoToAsync($"//{nameof(LoginPage)}");
            await Application.Current.MainPage.DisplayAlert("", "Cerró Sesión", "Aceptar");
        }
    }
}
