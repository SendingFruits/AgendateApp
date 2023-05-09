using Agendate_App.ViewModels;

namespace Agendate_App.Views;

public partial class LoginPage : ContentPage
{
	public LoginPage(LoginPageViewModel loginPageViewModel)
	{
		InitializeComponent();
		this.BindingContext= loginPageViewModel;
	}
}