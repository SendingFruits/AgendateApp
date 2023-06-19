using AgendateApp.API.Services;
using AgendateApp.API.Services.Intefaces;
using CommunityToolkit.Mvvm.ComponentModel;

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
        private string movil;
        [ObservableProperty]
        private string type; // empresa o cliente


        public RegisterPageViewModel() 
        {
            // ...
        }
    }
}
