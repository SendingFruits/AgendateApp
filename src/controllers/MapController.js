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
        id: 1,
        title: 'Antel Arena',
        location: {
            "latitude": -34.863847713411204,
            "longitude": -56.15342052653432,
        },
        description: 'Lugar de Eventos'
    },
    {
        id: 2,
        title: 'Terminal Belloni',
        location: {
            "latitude": -34.855488761673755,
            "longitude": -56.13270649686456,
        },
        description: 'Terminal de Ombibus'
    },
    {
        id: 3,
        title: 'Peluqueria X',
        location: {
            "latitude": -34.87917915703534,
            "longitude": -56.16783572360873,
        },
        description: 'Cortes, brushing y mas, todo unisex\nasdasdasd asdasdasda sdasdasdsads sdasdas dsdsad s ad\nwqewqeqwe qwewqeq wesddf.'
    }

    // {"latitude": -34.87917915703534, "latitudeDelta": 0.04610008092625151, "longitude": -56.16783572360873, "longitudeDelta": 0.03395508974790573}
];