import { API_BASE_URL } from './ApiConfig';
import axios from 'axios';

class MapServices {

    // getCompanies = async (lat,lng,cte) => {

    //     console.log(lat);

    //     try {
    //         const urlCompleta = `${API_BASE_URL}/Empresas/ObtenerEmpresasMapa?`
    //             +`radioCircunferencia=${cte}&`
    //             +`latitudeCliente=${lat}&`
    //             +`longitudeCliente=${lng}`;
    //         // console.log(API_BASE_URL);
    //         const response = await fetch(urlCompleta);

    //         // fetch(urlCompleta, {
    //         //     method: 'GET',
    //         //     headers: {
    //         //         'accept': 'text/json',
    //         //         'verify': 'false'
    //         //     }
    //         // });

    //         if (!response.ok) {
    //             throw new Error('Error al obtener Empresas');
    //         }
    //         const data = await response.json();
    //         console.log(data);
    //         return data;
    //     } catch (error) {
    //         console.error('Error getCompanies:', error);
    //         throw error;
    //     }
    // };

    getCompanies = async (lat, lng, cte) => {
        try {
            const urlCompleta = `${API_BASE_URL}/Empresas/ObtenerEmpresasMapa?`
                + `radioCircunferencia=${cte}&`
                + `latitudeCliente=${lat}&`
                + `longitudeCliente=${lng}`;
    
            const options = {
                method: 'GET',
                headers: {
                    'accept': 'text/json',
                },
            };
    
            const response = await axios(urlCompleta, options);
            if (!response.data) {
                throw new Error('Error al obtener Empresas');
            }
            const data = response.data;
            console.log(data);
            return data;
        } catch (error) {
            console.error('Error getCompanies:', error);
            throw error;
        }
    };
    
    
}

export default new MapServices();