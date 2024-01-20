import ApiConfig from './ApiConfig';
import axios from 'axios';

class BookingServices {

    getBookings = async (guid) => {
        return new Promise((resolve, reject) => {
        
            var method = 'Reservas/ReservasCliente';
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

    getSchedulesOfServices = async (guid, date) => {
        return new Promise((resolve, reject) => {
        
            var method = 'Reservas/ObtenerHorariosSegunFecha';
            const urlCompleta = `${ApiConfig.API_BASE_URL}${method}?idServicio=${guid}&fecha=${date}`;
    
            const options = {
                method: 'GET',
                headers: {
                    'accept': 'text/json',
                    // 'verify': false
                },
            };
             
            // console.log('urlCompleta: ', urlCompleta);

            axios.get(urlCompleta, options)
            .then(function (response) {
                // console.log('response: ', response);
                if (response.status == 200) {
                    resolve(response.data);
                } else {
                    resolve(null);
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
    }
}

export default new BookingServices();