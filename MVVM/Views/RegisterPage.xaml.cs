using AgendateApp.MVVM.ViewModels;
using System.Diagnostics;

namespace AgendateApp.MVVM.Views;

public partial class RegisterPage : ContentPage
{
    Dictionary<string, object> datosRegistro = new Dictionary<string, object>();

    public RegisterPage()
	{
		InitializeComponent();
        this.BindingContext = new RegisterPageViewModel();

        btnNext.IsEnabled = false;
    }


    private void Picker_SelectionChanged(object sender, EventArgs e)
    {
        Picker picker = (Picker)sender;
        var selectedValue = picker.SelectedItem as string;
        Debug.WriteLine("selectedValue: " + selectedValue.ToString());
        if (selectedValue != null)
        {
            btnNext.IsEnabled = true;
        }
    }

    private void btnNext_Clicked(object sender, EventArgs e)
    {
        string selectedValue = pType.SelectedItem as string;
        bool checkTerms = cbTerms.IsChecked;

        Debug.WriteLine("selectedValue: " + selectedValue.ToString());
        Debug.WriteLine("checkTerms: " + checkTerms.ToString());

        if (selectedValue != null)
        {
            datosRegistro["Username"] = "";
            datosRegistro["Password"] = "";
            datosRegistro["Firstname"] = "";
            datosRegistro["Lastname"] = "";

            if (true)
            {
                
            }
        }
        else
        {
            Application.Current.MainPage.DisplayAlert("Datos Incompletos", "Debe seleccionar un Tipo", "Aceptar");
        }


    }
}