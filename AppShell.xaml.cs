using Agendate_App.ViewModels;
using Agendate_App.Views;

namespace Agendate_App;

public partial class AppShell : Shell
{
	//public static Usuario userCredentials = new Usuario();
	public AppShell()
	{
		InitializeComponent();
		this.BindingContext= new AppShellViewModel();
		Routing.RegisterRoute(nameof(HomePage), typeof(HomePage));
	}

	
}
