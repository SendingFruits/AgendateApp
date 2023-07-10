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

using Microsoft.Maui.Handlers;
using IMap = AgendateApp.MAP.Controls.IMap;

namespace AgendateApp.MAP.Handlers;

public partial class MapHandler : IMapHandler
{
    public static IPropertyMapper<IMap, IMapHandler> Mapper 
        = new PropertyMapper<IMap, IMapHandler>(ViewHandler.ViewMapper)
    {
        [nameof(IMap.MapType)] = MapMapType,
        [nameof(IMap.IsShowingUser)] = MapIsShowingUser,
        [nameof(IMap.HasScrollEnabled)] = MapHasScrollEnabled,
        [nameof(IMap.HasTrafficEnabled)] = MapHasTrafficEnabled,
        [nameof(IMap.HasZoomEnabled)] = MapHasZoomEnabled
    };

    IMap IMapHandler.VirtualView => VirtualView;

    PlatformView IMapHandler.PlatformView => PlatformView;

    public MapHandler() : base(Mapper)
    {
    }
}