using Agendate_App.Models;

namespace Agendate_App;

public partial class App : Application
{
	public static Usuario userCredentials;

	public App()
	{
		InitializeComponent();

		MainPage = new AppShell();
	}
}
