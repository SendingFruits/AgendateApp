using AgendateApp.MVVM.ViewModels;
using AgendateApp.MVVM.Views;
using System.Diagnostics;
using System.Windows.Input;

namespace AgendateApp;

public partial class AppShell : Shell
{
	public AppShell()
	{
		InitializeComponent();
        this.BindingContext = new AppShellViewModel();

        Debug.WriteLine("BindingContext: " + this.BindingContext.ToString());

        Routing.RegisterRoute(nameof(MainPage), typeof(MainPage));
        Routing.RegisterRoute(nameof(RegisterPage), typeof(RegisterPage));
    }
}
