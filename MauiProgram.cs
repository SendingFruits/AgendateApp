using AgendateApp.MVVM.ViewModels;
using AgendateApp.MVVM.Views;
using AgendateApp.MAP.Handlers;
using Map = AgendateApp.MAP.Controls.Map;

namespace AgendateApp;

public static class MauiProgram
{
	public static MauiApp CreateMauiApp()
	{
		var builder = MauiApp.CreateBuilder();
		builder
			.UseMauiApp<App>()
			.ConfigureFonts(fonts =>
			{
				fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
				fonts.AddFont("OpenSans-Semibold.ttf", "OpenSansSemibold");
			})
            .ConfigureMauiHandlers(handlers =>
            {
                handlers.AddHandler(typeof(Map), typeof(MapHandler));
            });

        builder.Services.AddSingleton<LoginPage>();
        builder.Services.AddSingleton<RegisterPage>();
        builder.Services.AddSingleton<BookingsPage>();

        builder.Services.AddSingleton<LoginPageViewModel>();

        return builder.Build();
	}
}
