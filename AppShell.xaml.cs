using AgendateApp.MVVM.ViewModels;
using AgendateApp.MVVM.Views;

namespace AgendateApp;

public partial class AppShell : Shell
{
	public AppShell()
	{
		InitializeComponent();
        this.BindingContext = new AppShellViewModel();
        Routing.RegisterRoute(nameof(MainPage), typeof(MainPage));
    }
}
