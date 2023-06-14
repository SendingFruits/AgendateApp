using System.Diagnostics;
using AgendateApp.MAP.Controls;

namespace AgendateApp;

public partial class MainPage : ContentPage
{
    public MainPage()
    {
        InitializeComponent();
    }

    protected override async void OnAppearing()
    {
        base.OnAppearing();

        //map.IsShowingUser = true;
        //map.HasTrafficEnabled = true;
        //map.HasZoomEnabled = true;
        //map.HasScrollEnabled = true;

        PermissionStatus result = await CheckAndRequestLocationPermission();
        Debug.WriteLine("Location permissions: " + result.ToString());

        //try
        //{
        //    var request = new GeolocationRequest(GeolocationAccuracy.Medium);
        //    var location = await Geolocation.GetLocationAsync(request);
        //    Debug.WriteLine("request: " + request.ToString());
        //    Debug.WriteLine("location: " + location.ToString());
        //    if (location != null)
        //    {
        //        //map.Latitude = location.Latitude;
        //        //map.Longitude = location.Longitude;
        //        LatLng ubicacion = new LatLng(location.Latitude, location.Longitude);
        //        MarkerOptions markerOptions = new MarkerOptions()
        //            .SetPosition(ubicacion)
        //            .SetTitle("Mi ubicación");
        //        map.AddMarker(markerOptions);
        //    }
        //}
        //catch (Exception ex)
        //{
        //    Console.WriteLine($"Error al obtener la ubicación: {ex.Message}");
        //}
    }

    async Task<PermissionStatus> CheckAndRequestLocationPermission()
    {
        PermissionStatus status = await Permissions.CheckStatusAsync<Permissions.LocationWhenInUse>();

        if (status == PermissionStatus.Granted)
            return status;

        if (status == PermissionStatus.Denied && DeviceInfo.Platform == DevicePlatform.iOS)  
            return status;
        
        if (Permissions.ShouldShowRationale<Permissions.LocationWhenInUse>())
        {
            // Solicitar al usuario información adicional sobre por qué se necesita el permiso
        }
        status = await Permissions.RequestAsync<Permissions.LocationWhenInUse>();
        return status;
    }

    void OnMapTypePickerSelectedIndexChanged(object sender, EventArgs e)
    {
        Picker picker = (Picker)sender;

        switch (picker.SelectedItem.ToString())
        {
            default:
            case "Street":
                map.MapType = MapType.Street;
                break;
            case "Satellite":
                map.MapType = MapType.Satellite;
                break;
            case "Hybrid":
                map.MapType = MapType.Hybrid;
                break;
        }
    }

    void OnContentPageUnloaded(object sender, EventArgs e)
    {
        map.Handler?.DisconnectHandler();
    }
}