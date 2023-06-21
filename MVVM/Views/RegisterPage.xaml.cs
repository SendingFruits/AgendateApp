using AgendateApp.MVVM.ViewModels;
using System.Diagnostics;

//using Microsoft.Maui.Essentials;

namespace AgendateApp.MVVM.Views;

public partial class RegisterPage : ContentPage
{
    Dictionary<string, object> datosRegistro = new Dictionary<string, object>();


    private string photoPath;
    public string PhotoPath
    {
        get => photoPath;
        set
        {
            if (photoPath != value)
            {
                photoPath = value;
                OnPropertyChanged();
            }
        }
    }


    public RegisterPage()
	{
		InitializeComponent();
        this.BindingContext = new RegisterPageViewModel();

        //btnNext.IsEnabled = false;

        PhotoPath = "Resources/Images/dotnet_bot.svg";
    }


    private void Picker_SelectionChanged(object sender, EventArgs e)
    {
        Picker picker = (Picker)sender;
        var selectedValue = picker.SelectedItem as string;
        Debug.WriteLine("selectedValue: " + selectedValue.ToString());
        if (selectedValue != null)
        {
            //btnNext.IsEnabled = true;
        }
    }

    private async void btnNext_Clicked(object sender, EventArgs e)
    {
        //string selectedValue = "";
        ////string selectedValue = pType.SelectedItem as string;
        ////Debug.WriteLine("selectedValue: " + selectedValue.ToString());

        //bool checkTerms = cbTerms.IsChecked;
        ////Debug.WriteLine("checkTerms: " + checkTerms.ToString());


        //if (selectedValue != null)
        //{
        //    //if (selectedValue == "Cliente")
        //    //{
        //    //    await Shell.Current.GoToAsync(nameof(RegisterPageCompany));
        //    //}
        //    //if (selectedValue == "Empresa")
        //    //{
        //    //    await Shell.Current.GoToAsync(nameof(RegisterPageCompany));
        //    //}
        //}
        //else
        //{
        //    await Application.Current.MainPage.DisplayAlert("Datos Incompletos", "Debe seleccionar un Tipo", "Aceptar");
        //}


    }

    private async void btnPhotoUpload_Clicked(object sender, EventArgs e)
    {
        try
        {
            FileResult result = await FilePicker.PickAsync(new PickOptions
            {
                FileTypes = FilePickerFileType.Images,
                //PresentationSourceBounds = DeviceInfo.Platform == DevicePlatform.iOS 
                //    && DeviceInfo.Idiom == DeviceIdiom.Tablet ? new Rectangle(0, 20, 0, 0) : Rectangle.Empty
            });

            if (result != null)
            {
                // Aquí puedes guardar la imagen seleccionada en tu lógica de negocio
                string filePath = result.FullPath;
                // ...
            }
        }
        catch (Exception ex)
        {
            // Maneja cualquier excepción que pueda ocurrir durante la selección de archivos
            // ...
        }
    }
}