namespace AgendateApp.MVVM.Views;

public partial class FlyoutUserControl : ContentView
{
	public FlyoutUserControl()
	{
		InitializeComponent();

		if (App.userCredentials != null)
		{
			lblUsername.Text = "Usuario: " + App.userCredentials.Username;
            //lblEmail.Text = App.userCredentials.Username; // setear desde la API
        }
	}
}