import ApiConfig from './ApiConfig';
import axios from 'axios';

class MapServices {

    getCompanies = async (lat, lng, cte) => {

        console.log('API_BASE_URL: ', ApiConfig.API_BASE_URL);

        try {
            const urlCompleta = `${ApiConfig.API_BASE_URL}/Empresas/ObtenerEmpresasMapa?`
            // const urlCompleta = `https://localhost:7170/api/Empresas/ObtenerEmpresasMapa?`
                + `radioCircunferencia=${cte}&`
                + `latitudeCliente=${lat}&`
                + `longitudeCliente=${lng}`;
    
            const options = {
                method: 'GET',
                headers: {
                    'accept': 'text/json',
                    // 'verify': false
                },
            };
            console.log('urlCompleta: ',urlCompleta); 
            const response = await axios.get(urlCompleta, options);
            if (!response.data) {
                throw new Error('Error al obtener Empresas');
            }
            const data = response.data;
            console.log('data: ', data); 
            return data;
        } catch (error) {
            console.error('Error getCompanies:', error);
            throw error;
        }
    };
}

export default new MapServices();