using AgendateApp.MVVM.ViewModels;
using System.Diagnostics;
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
        PhotoPath = "Resources/Images/dotnet_bot.svg";
    }

    protected override void OnAppearing()
    {
        base.OnAppearing();
        initialStatus();
    }

    private void initialStatus()
    {
        lblTitle.Text = "Datos de Usuario";
        // Users
        entryUsername.Text = "";
        entryPassword.Text = "";
        entryFirstname.Text = "";
        entryLastname.Text = "";
        entryEmail.Text = "";
        // Customers
        entryDocument.Text = "";
        // Companies
        pDocuType.SelectedIndex = 0;
        entryRUT.Text = "";
        entryBusiName.Text = "";
        entryArea.Text = "";

        bodyUserData.IsVisible = true;
        bodyCustomerData.IsVisible = false;
        bodyCompanyData.IsVisible = false;

        //pType.Items.Clear();

        btnNext.IsVisible = true;
        btnSend.IsVisible = false;
        btnBack.IsVisible = false;
    }


    private async void btnNext_Clicked(object sender, EventArgs e)
    {
        try
        {
            if (entryUsername.Text == "")
            {
                await Application.Current.MainPage.DisplayAlert("Datos Incompletos",
                    "Debe ingresar un Usuario", "Aceptar");
                entryUsername.Focus();
                return;
            }
            if (entryPassword.Text == "")
            {
                await Application.Current.MainPage.DisplayAlert("Datos Incompletos",
                    "Debe ingresar una Contraseña", "Aceptar");
                entryPassword.Focus();
                return;
            }
            if (entryFirstname.Text == "")
            {
                await Application.Current.MainPage.DisplayAlert("Datos Incompletos",
                    "Debe ingresar un Nombre", "Aceptar");
                entryFirstname.Focus();
                return;
            }
            if (entryLastname.Text == "")
            {
                await Application.Current.MainPage.DisplayAlert("Datos Incompletos",
                    "Debe ingresar un Apellido", "Aceptar");
                entryLastname.Focus();
                return;
            }
            if (entryEmail.Text == "")
            {
                await Application.Current.MainPage.DisplayAlert("Datos Incompletos",
                    "Debe ingresar un Correo", "Aceptar");
                entryEmail.Focus();
                return;
            }

            string selectedValue = "";
            if (pType.SelectedItem is not null)
            {
                selectedValue = pType.SelectedItem as string;
            }
            bool checkTerms = cbTerms.IsChecked;

            if (selectedValue != "")
            {
                if (checkTerms is true)
                {
                    btnNext.IsVisible = false;
                    btnSend.IsVisible = false;
                    btnBack.IsVisible = true;

                    bodyUserData.IsVisible = false;

                    if (selectedValue == "Cliente")
                    {
                        lblTitle.Text = "Datos de Cliente";
                        bodyCustomerData.IsVisible = true;
                    }
                    if (selectedValue == "Empresa")
                    {
                        lblTitle.Text = "Datos de Empresa";
                        bodyCompanyData.IsVisible = true;
                    }
                }
                else
                {
                    await Application.Current.MainPage.DisplayAlert(" ",
                        "Debe aceptar los terminos y condiciones", "Aceptar");
                }
            }
            else
            {
                await Application.Current.MainPage.DisplayAlert("Datos Incompletos",
                    "Debe seleccionar un Tipo", "Aceptar");
            }
        }
        catch (Exception ex)
        {
            await Application.Current.MainPage.DisplayAlert("Error",
                ex.Message, "Aceptar");
        }
    }

    private async void btnSend_Clicked(object sender, EventArgs e)
    {
        try
        {
            // pDocuType

            if (entryRUT.Text == "")
            {
                await Application.Current.MainPage.DisplayAlert("Datos Incompletos",
                    "Debe ingresar un Usuario", "Aceptar");
                entryUsername.Focus();
                return;
            }
            if (entryPassword.Text == "")
            {
                await Application.Current.MainPage.DisplayAlert("Datos Incompletos",
                    "Debe ingresar una Contraseña", "Aceptar");
                entryPassword.Focus();
                return;
            }
            if (entryFirstname.Text == "")
            {
                await Application.Current.MainPage.DisplayAlert("Datos Incompletos",
                    "Debe ingresar un Nombre", "Aceptar");
                entryFirstname.Focus();
                return;
            }
            
        }
        catch (Exception ex)
        {
            await Application.Current.MainPage.DisplayAlert("Error",
                ex.Message, "Aceptar");
        }
    }

    private async void btnBack_Clicked(object sender, EventArgs e)
    {
        try
        {
            lblTitle.Text = "Datos de Usuario";

            btnNext.IsVisible = true;
            btnBack.IsVisible = false;
            btnSend.IsVisible = false;

            bodyUserData.IsVisible = true;
            bodyCustomerData.IsVisible = false;
            bodyCompanyData.IsVisible = false;
        }
        catch (Exception ex)
        {
            await Application.Current.MainPage.DisplayAlert("Error",
                ex.Message, "Aceptar");
        }
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
            await Application.Current.MainPage.DisplayAlert("Error",
                ex.Message, "Aceptar");
            // Maneja cualquier excepción que pueda ocurrir durante la selección de archivos
            // ...
        }
    }
}