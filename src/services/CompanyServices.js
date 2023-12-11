import { API_BASE_URL } from './ApiConfig';
import axios from 'axios';

class CompanyServices {

    postExample = async (guid) => {

        var method = 'Servicios/BuscarServicioPorEmpresa';
        var urlComplete = `${ApiConfig.API_BASE_URL}${method}`;

        console.log(urlCompleta);

        const headers = {
            // Agrega aquí las cabeceras requeridas por la API
        };
        
        axios.post(urlCompleta, {}, { headers })
        .then(function (response) {
            console.log(response.data);
            if (response.status == 200) {
                resolve(JSON.stringify(response.data));
            } else {
                resolve(response.data);
            }
        })
        .catch(function (error) {
            if (error.message == 'Network Error') {
                reject('Error de Conexión. Verifique su conexión a Internet o consulte el proveedor.');  
            } else {
                if (error.response.status >= 500) {
                    reject('Error de Servidor. Verifique su conexión a Internet o consulte el proveedor.');                
                } else if ((error.response.status >= 400) && (error.response.status < 500)) {
                    reject(error.response.data); 
                } else {
                    reject('Error Desconocido.');    
                }
            }
        });

    };

    getServicesForCompany = async (guid) => {
        return new Promise((resolve, reject) => {
        
            var method = 'Servicios/BuscarServicioPorEmpresa';
            const urlCompleta = `${ApiConfig.API_BASE_URL}${method}?id=${guid}`;
    
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
                    resolve(-1);
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

export default new CompanyServices();