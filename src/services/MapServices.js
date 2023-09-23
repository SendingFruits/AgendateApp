import { API_BASE_URL } from './ApiConfig';
import axios from 'axios';

class MapServices {

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
            // console.log(urlCompleta); 
            const response = await axios(urlCompleta, options);
            if (!response.data) {
                throw new Error('Error al obtener Empresas');
            }
            const data = response.data;
            // console.log(data); 
            return data;
        } catch (error) {
            console.error('Error getCompanies:', error);
            throw error;
        }
    };
}

export default new MapServices();