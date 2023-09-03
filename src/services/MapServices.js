import { API_BASE_URL } from './ApiConfig';
import axios from 'axios';

class MapServices {

    getCompanies = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/Empresas/ObtenerEmpresasMapa`);
            if (!response.ok) {
                throw new Error('Error al obtener Empresas');
            }
            const data = await response.json();
            // console.log(data);
            return data;
        } catch (error) {
            console.error('Error getCompanies:', error);
            throw error;
        }
    };
}

export default new MapServices();