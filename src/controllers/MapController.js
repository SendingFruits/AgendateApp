import * as Location from 'expo-location';
import databaseData from '../services/database/database.json';


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

export const searchCompany = async (company) => {
    try {
        
    } catch (error) {
        console.log('Error al obtener la Empresa:', error);
        throw error;
    }

    // necesito, en la siguiente funcion
    // export const searchCompany = async (company) => {
    //     try {
            
    //     } catch (error) {
    //         console.log('Error al obtener la Empresa:', error);
    //         throw error;
    //     }
    // };

    // hacer una logica que me perita buscar en mi database.json todas las Companies 
};

export const companyLocations = async () => {
    const usersList = databaseData.Users;
    const companiesList = databaseData.Companies;

    const organizedCompanies = companiesList.map(company => {
        const user = usersList.find(user => user.Id === company.UserId);

        var title = user.firstname +' '+ user.lastname;
        return {
            id: company.UserId,
            title: title,
            location: company.location,
            description: company.description,
        };
    });


    console.log('organizedCompanies:');
    console.log(organizedCompanies);
    return organizedCompanies
};

export let companyLocationsOld = [
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
];

function getServicesForCompany(idCompany) {

}

class MapController {

    // companyLocations = async () => {
    //     const usersList = databaseData.Users;
    //     const companiesList = databaseData.Companies;
    
    //     const organizedCompanies = companiesList.map(company => {
    //         const user = usersList.find(user => user.UserId === company.UserId);
    //         var title = user.firstname +' '+ user.lastname;
    //         return {
    //             id: company.UserId,
    //             title: title,
    //             location: company.location,
    //             description: company.description,
    //         };
    //     });
    
    //     console.log('organizedCompanies:');
    //     console.log(organizedCompanies);
    //     return organizedCompanies
    // };
}

export default new MapController();