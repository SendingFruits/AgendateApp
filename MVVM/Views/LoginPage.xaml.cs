using AgendateApp.ViewModels;

namespace AgendateApp.Views;

public partial class LoginPage : ContentPage
{
	public LoginPage(LoginPageViewModel loginPageViewModel)
	{
		InitializeComponent();
		this.BindingContext= loginPageViewModel;
	}
}