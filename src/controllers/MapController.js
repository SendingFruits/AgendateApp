import { 
	PermissionsAndroid
} from 'react-native';


import * as Location from 'expo-location';

export const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        throw new Error('Permiso de acceso a la ubicación denegado.');
    }
    return status;
};

export const getLocation = async () => {
    console.log('getLocation');
    try {
        const locationOptions = {
            accuracy: Location.Accuracy.BestForNavigation,
            timeout: 3000,
            maximumAge: 0,
            distanceInterval: 0.5,
            foregroundService: true
        };

        const { coords } = await Location.getCurrentPositionAsync(locationOptions);
        const { latitude, longitude } = coords;
        const initialRegion = {
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        };
        console.log(initialRegion);
        return initialRegion;
    } catch (error) {
        console.log('Error al obtener la ubicación:', error);
        throw error;
    }
};


// import Geolocation from 'react-native-geolocation-service';

export const requestLocationPermissionPA = async () => {
	try {
	  	const granted = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
			{
				title: 'Permitir Ubicación',
				message: '¿Permites a la App utilizar tu ubicación?',
				buttonNeutral: 'Más Tarde',
				buttonNegative: 'Cancelar',
				buttonPositive: 'Aceptar',
			},
		);
		if (granted === PermissionsAndroid.RESULTS.GRANTED) {
			console.log('Ya puedes utilizar la ubicación');
		} else {
			console.log('Permiso denegado');
		}
	} catch (err) {
	  	console.warn(err);
	}
};

export const getLocationGEO = () => {
	return new Promise((resolve, reject) => {
		Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                const initialRegion = {
                    latitude,
                    longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                };
                resolve(initialRegion);
            },
            error => {
                reject(error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
	});
};