import ApiConfig from './ApiConfig';
import axios from 'axios';

class MapServices {

    getCompanies = async (lat, lng, cte) => {
        // console.log('API_BASE_URL: ', ApiConfig.API_BASE_URL);
        const data = '';
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
            // console.log('urlCompleta: ',urlCompleta); 
            const response = await axios.get(urlCompleta, options);
            // console.log('response.status: ', response.status);
            if (response.status) {
                return response.data;
            } else {
                return -1;
            }

        } catch (error) {
            console.error('Error getCompanies:', error);
            if (error.message == 'Network Error') {
                reject('Error de Conexión. Verifique su conexión a Internet o consulte el proveedor.');  
            } else {
                if (error.response.status == 404) {
                    return 'Error de Conexión. Verifique su conexión a Internet o consulte el proveedor.';    
                } else {
                    return error.response.data;
                }
            }
            
        }
    };
}

export default new MapServices();