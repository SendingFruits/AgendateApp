using AgendateApp.MVVM.ViewModels;

namespace AgendateApp.MVVM.Views;

public partial class LoginPage : ContentPage
{
	public LoginPage(LoginPageViewModel loginPageViewModel)
	{
		InitializeComponent();
		this.BindingContext= loginPageViewModel;
	}
}