using AgendateApp.MVVM.ViewModels;
using System.Diagnostics;
namespace AgendateApp.MVVM.Views;

public partial class LoginPage : ContentPage
{
	//public LoginPage(LoginPageViewModel loginPageViewModel)
	//{
	//	InitializeComponent();
	//	this.BindingContext = loginPageViewModel;
	//}

    public LoginPage()
    {
        InitializeComponent();
        this.BindingContext = new LoginPageViewModel();
    }
}