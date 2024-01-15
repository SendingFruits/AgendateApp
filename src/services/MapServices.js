import ApiConfig from './ApiConfig';
import axios from 'axios';

class MapServices {

    getCompaniesOld = async (lat, lng, cte) => {
        console.log('API_BASE_URL: ', ApiConfig.API_BASE_URL);
        const data = '';
        try {
            var method = 'Empresas/ObtenerEmpresasMapa';
            const urlCompleta = `${ApiConfig.API_BASE_URL}${method}?`
            //const urlCompleta = `http://192.168.1.7:9080/api/Empresas/ObtenerEmpresasMapa?`
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
            // console.log('response.status: ', response.status.toString());
            if (response.status) {
                // console.log('response.data: ', response.data);
                return response.data;
            } else {
                return -1;
            }

        } catch (error) {
            // console.error('Error getCompanies:', error);
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

    getCompanies = async (lat, lng, cte) => {
        return new Promise((resolve, reject) => {
        
            var method = 'Empresas/ObtenerEmpresasMapa';
            const urlCompleta = `${ApiConfig.API_BASE_URL}${method}?`
            //const urlCompleta = `http://192.168.1.7:9080/api/Empresas/ObtenerEmpresasMapa?`
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
            
            axios.get(urlCompleta, options)
            .then(function (response) {
                // console.log(response.data);
                if (response.status == 200) {
                    resolve(response.data);
                } else {
                    if (response.status === 204) resolve([]);
                    else resolve(-1);
                }
            })
            .catch(function (error) {
                if (error.message == 'Network Error') {
                    reject('Error de Conexión. Verifique su conexión a Internet o consulte el proveedor.');  
                } else {
                    if (error.response.status >= 500) {
                        reject(-1);                
                    } else if ((error.response.status >= 400) && (error.response.status < 500)) {
                        reject(error.response.data); 
                    } else {
                        reject('Error Desconocido.');    
                    }
                }
            });
            
        });
    };


}

export default new MapServices();