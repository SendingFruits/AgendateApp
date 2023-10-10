import * as Location from 'expo-location';
import databaseData from '../services/database/database.json';
import MapServices from '../services/MapServices';

class MapController {

    getLocation = async () => {
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
                latitudeDelta: 0.0050,
                longitudeDelta: 0.0050
            };
            // console.log(initialRegion);
            return initialRegion;
        } catch (error) {
            console.log('Error al obtener la ubicación:', error);
            throw error;
        }
    };

    requestLocationPermission = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            throw new Error('Permiso de acceso a la ubicación denegado.');
        }
        return status;
    };

    searchCompany = async (company) => {
        try {
            
        } catch (error) {
            console.log('Error al obtener la Empresa:', error);
            throw error;
        }
    };

    companyLocations = async (loc,cte) => {
        var list = await MapServices.getCompanies(loc.latitude,loc.longitude,cte);
        console.log('list: ',list);
        if (list !== undefined) {
            const organizedCompanies = list.map(company => {
                return {
                    id: company.id,
                    title: company.razonSocial,
                    location: {
                        "latitude":company.latitude,
                        "longitude":company.longitude,
                        "latitudeDelta": 0.00699,
                        "longitudeDelta":0.00499,
                    },
                    address: company.direccion,
                    description: company.descripcion,
                    itemCompany: company.company, 
                }
            });
            return organizedCompanies;
        } else {
            return null;
        }
    };

    getServicesForCompany = async (idCompany) =>  {
    };
}

export default new MapController();