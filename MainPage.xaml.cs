using AgendateApp.MAP.Controls;
using AgendateApp.MAP.Handlers;

#if ANDROID
using Android.Content;
using Android.Gms.Maps;
using Android.Locations;
using Android.Gms.Maps.Model;
using Location = Android.Locations.Location;
using PlatformView = Android.Gms.Maps.MapView;
#elif WINDOWS
using PlatformView = Microsoft.UI.Xaml.FrameworkElement;
#elif IOS || MACCATALYST
using PlatformView = MapKit.MKMapView;
#elif (NETSTANDARD || !PLATFORM) || (NET6_0 && !IOS && !ANDROID)
using PlatformView = System.Object;
#endif

using Debug = System.Diagnostics.Debug;
using IMap = AgendateApp.MAP.Controls.IMap;


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

        PermissionStatus result = await CheckAndRequestLocationPermission();
        Debug.WriteLine("Location permissions: " + result.ToString());
        try
        {
            var request = new GeolocationRequest(GeolocationAccuracy.Medium);
            var location = await Geolocation.GetLocationAsync(request);

            MapHandler mapHandler = new MapHandler();

            CenterMapOnLocation(mapHandler, map);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error al obtener la ubicación: {ex.Message}");
        }
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

    public static void CenterMapOnLocation(IMapHandler handler, IMap map)
    {
        #if ANDROID
        GoogleMap googleMap = handler?.Map;
        if (googleMap == null) return;
        
        if (map.IsShowingUser && handler?.MauiContext?.Context != null)
        {
            var locationManager = (LocationManager)handler.MauiContext.Context.GetSystemService(Context.LocationService);
            Criteria criteria = new Criteria();
            string bestProvider = locationManager.GetBestProvider(criteria, false);

            if (bestProvider != null)
            {
                Location location = locationManager.GetLastKnownLocation(bestProvider);
                if (location != null)
                {
                    LatLng latLng = new LatLng(location.Latitude, location.Longitude);
                    CameraUpdate cameraUpdate = CameraUpdateFactory.NewLatLngZoom(latLng, 15); // Ajusta el nivel de zoom aquí
                    googleMap.MoveCamera(cameraUpdate);
                }
            }
        }
        #endif
    }
}