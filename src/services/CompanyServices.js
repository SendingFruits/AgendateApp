import ApiConfig from './ApiConfig';
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
        
            var method = 'Servicios/BuscarServicioPorIdEmpresa';
            const urlCompleta = `${ApiConfig.API_BASE_URL}${method}?id=${guid}`;
    
            const options = {
                method: 'GET',
                headers: {
                    'accept': 'text/json',
                    // 'verify': false
                },
            };
             
            // console.log(urlCompleta);

            axios.get(urlCompleta, options)
            .then(function (response) {
                // console.log('response.data: ', response.data);
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
    };

    putCompanyData = async (json) => {
        return new Promise((resolve, reject) => {
  
            var method = 'Empresas/ActualizarEmpresa';
            var urlCompleta = `${ApiConfig.API_BASE_URL}${method}`;

            const headers = {
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            };

            console.log('json: ', json);
            console.log('urlCompleta: ', urlCompleta);
            axios.put(urlCompleta, json, { headers })
            .then(function (response) {
                console.log('response: ', response);
                if (response.status == 200) {
                    resolve(JSON.stringify(response.data));
                } else {
                    resolve(response.errors);
                }
            })
            .catch(function (error) {
                console.log('error.response.data: ', error.response.data);
                reject(error.response.data);
            });
        });   
    }

    postServiceData = async (json) => {

        var method = 'Servicios';
        var urlComplete = `${ApiConfig.API_BASE_URL}${method}`;

        console.log(urlCompleta);

        const headers = {
            // Agrega aquí las cabeceras requeridas por la API
        };
        
        axios.post(urlCompleta, {json}, { headers })
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
    }

    putServiceData = async (json) => {
        return new Promise((resolve, reject) => {
  
            var method = 'ActualizarServicio';
            var urlCompleta = `${ApiConfig.API_BASE_URL}${method}`;

            const headers = {
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            };

            console.log('json: ', json);
            console.log('urlCompleta: ', urlCompleta);
            axios.put(urlCompleta, json, { headers })
            .then(function (response) {
                console.log(response);
                if (response.status == 200) {
                    // deberia devolver el objeto con los datos nuevos, pero no devuelve nada
                    resolve(JSON.stringify(response.data));
                } else {
                    resolve(response.errors);
                }
            })
            .catch(function (error) {
                console.log('error: ', error);
                // reject(error.response.data);

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

    deleteService = async (json) => {
        return new Promise((resolve, reject) => {
  
            var method = 'EliminarServicio';
            var urlCompleta = `${ApiConfig.API_BASE_URL}${method}`;

            const headers = {
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            };

            console.log('json: ', json);
            console.log('urlCompleta: ', urlCompleta);
            axios.delete(urlCompleta, { headers })
            .then(function (response) {
                if (response.status == 200) {
                    resolve(JSON.stringify(response.data));
                } else {
                    resolve(response.errors);
                }
            })
            .catch(function (error) {
                reject(error.response.data);
            });
        });
    }
}

export default new CompanyServices();