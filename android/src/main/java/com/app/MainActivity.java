package com.app;

import com.facebook.react.ReactActivity;
import com.reactnativecommunity.geolocation.GeolocationPackage; // Importa esta línea

public class MainActivity extends ReactActivity {

    // ...

    @Override
    protected List<ReactPackage> getPackages() {
        @SuppressWarnings("UnnecessaryLocalVariable")
        List<ReactPackage> packages = new PackageList(this).getPackages();
        packages.add(new GeolocationPackage()); // Agrega esta línea
        // ...
        return packages;
    }

    // ...
}