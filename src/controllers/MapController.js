import * as Location from 'expo-location';
import databaseData from '../services/database/database.json';
import UserServices from '../services/UserServices';

class MapController {

    API_BASE_URL = 'https://example.com/api';

	// constructor(search) {
	// 	this.organizedCompanies = this.searchCompany(search);
	// }

    // companyLocations = async () => {
    //     const usersList = databaseData.Users;
    //     const companiesList = databaseData.Companies;
    //     const organizedCompanies = companiesList.map(company => {
    //         const user = usersList.find(user => user.Id === company.UserId);
    //         var title = user.firstname +' '+ user.lastname;
    //         return {
    //             id: company.UserId,
    //             title: company.socialReason,
    //             location: company.location,
    //             description: company.description,
    //         };
    //     });
    //     return organizedCompanies
    // };

    // searchCompany = async (company) => {
    //     try {
    //         organizedCompanies.map(company => {
    //             const user = usersList.find(user => user.Id === company.UserId);
    //             var title = user.firstname +' '+ user.lastname;
    //             return {
    //                 id: company.UserId,
    //                 title: company.socialReason,
    //                 location: company.location,
    //                 description: company.description,
    //             };
    //         });
    //     } catch (error) {
    //         console.log('Error al obtener la Empresa:', error);
    //         throw error;
    //     }
    // };
}

export default new MapController();


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
            latitudeDelta: 0.0122,
            longitudeDelta: 0.0122
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

    // hacer una logica que me permita buscar en mi database.json todas las Companies 
};

export const companyLocations = async () => {
    const usersList = databaseData.Users;
    const companiesList = databaseData.Companies;
    const organizedCompanies = companiesList.map(company => {
        const user = usersList.find(user => user.Id === company.UserId);
        var title = user.firstname +' '+ user.lastname;
        return {
            id: company.UserId,
            title: company.socialReason,
            location: company.location,
            description: company.description,
        };
    });
    // console.log('organizedCompanies:');
    // console.log(organizedCompanies);
    return organizedCompanies
    // var list = UserServices.getCompanies();
    // console.log(list);
    // return  list;
};

export const getServicesForCompany = async (idCompany) =>  {

}

export const getCompanies = async () =>  {
    return UserServices.getCompanies();
}