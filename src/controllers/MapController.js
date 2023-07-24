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
    // console.log('getLocation');
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
        // console.log(initialRegion);
        return initialRegion;
    } catch (error) {
        console.log('Error al obtener la ubicación:', error);
        throw error;
    }
};



export let companyLocations = [
    {
        title: 'Antel Arena',
        location: {
            "latitude": -34.863847713411204,
            "longitude": -56.15342052653432,
        },
        description: 'Lugar de Eventos'
    },
    {
        title: 'Terminal Belloni',
        location: {
            "latitude": -34.855488761673755,
            "longitude": -56.13270649686456,
        },
        description: 'Terminal de Ombibus'
    }
];