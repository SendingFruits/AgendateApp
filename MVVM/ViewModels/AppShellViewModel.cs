using AgendateApp.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AgendateApp.ViewModels
{
    public partial class AppShellViewModel : BaseViewModel
    {
        //[ICommand]
        async void SignOut()
        {
            if (Preferences.ContainsKey(nameof(App.userCredentials)))
            {
                Preferences.Remove(nameof(App.userCredentials));
            }
            await Shell.Current.GoToAsync($"//{nameof(LoginPage)}");
        }
    }
}
