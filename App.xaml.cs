using AgendateApp.MVVM.Models;

namespace AgendateApp;

public partial class App : Application
{
    public static User userCredentials;
	public static Ubicacion userCoordinates;

    public App()
	{
		InitializeComponent();

		MainPage = new AppShell();
	}
}

public class Ubicacion
{
    public double Latitud { get; set; }
    public double Longitud { get; set; }
}