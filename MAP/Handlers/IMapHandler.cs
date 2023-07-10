#if ANDROID
using Android.Gms.Maps;
using PlatformView = Android.Gms.Maps.MapView;
#elif WINDOWS
using PlatformView = Microsoft.UI.Xaml.FrameworkElement;
#elif IOS || MACCATALYST
using PlatformView = MapKit.MKMapView;
#elif (NETSTANDARD || !PLATFORM) || (NET6_0 && !IOS && !ANDROID)
using PlatformView = System.Object;
#endif

using IMap = AgendateApp.MAP.Controls.IMap;

namespace AgendateApp.MAP.Handlers
{
    public interface IMapHandler : IViewHandler
    {
        new IMap VirtualView { get; }
        new PlatformView PlatformView { get; }
#if ANDROID
		GoogleMap Map { get; set; }
#endif
    }
}
