import ApiConfig from './ApiConfig';
import axios from 'axios';

class UserServices {

    doLogin = async (username, password) => {
        return new Promise((resolve, reject) => {
        
            const usuarioCodificado = encodeURIComponent(username);
            const contraseniaCodificada = encodeURIComponent(password);
            
            var method = 'Usuarios/Login';
            const urlCompleta = `${ApiConfig.API_BASE_URL}${method}?`
                +`pUsuario=${usuarioCodificado}&`
                +`pContrasenia=${contraseniaCodificada}`;

            // console.log(urlCompleta);

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
            
        });
    };

    postUserRegister = async (json) => {
        return new Promise((resolve, reject) => {
  
            var method = '';

            if (json.TipoUsuario == 'customer') {
                method = 'Clientes/RegistrarCliente';
            } 
            if (json.TipoUsuario == 'company') {
                method = 'Clientes/RegistrarEmpresa';
            } 

            var urlCompleta = `${ApiConfig.API_BASE_URL}${method}`;

            const headers = {
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            };

            console.log('json: ', json);
            console.log('urlCompleta: ', urlCompleta);
            axios.post(urlCompleta, json, { headers })
            .then(function (response) {
                console.log('status: ',JSON.stringify(response.status));
                console.log('response: ',JSON.stringify(response.data));
                if (response.status == 200) {
                    resolve(true);
                } else {
                    resolve('Error de Conexión. Verifique su conexión a Internet o consulte el proveedor.');
                }
            })
            .catch(function (error) {
                // reject(error.response.data);
                reject('Error de Conexión. Verifique su conexión a Internet o consulte el proveedor.');
            });
        });
    };
    
    putUserData = async (json) => {
        return new Promise((resolve, reject) => {
  
            var method = '/Clientes/ActualizarCliente';
            var urlCompleta = `${ApiConfig.API_BASE_URL}${method}`;

            const headers = {
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            };

            console.log('json: ', json);
            console.log('urlCompleta: ', urlCompleta);
            axios.put(urlCompleta, json, { headers })
            .then(function (response) {
                console.log(response.status);
                if (response.status == 200) {
                    resolve(JSON.stringify(response.data));
                } else {
                    resolve(response);
                }
            })
            .catch(function (error) {
                reject(error.response.data);
            });
        });
    };

    putPassword = async (json) => {
        return new Promise((resolve, reject) => {
  
            var method = 'Usuarios/ActualizarContraseniaBody';
            const urlCompleta = `${ApiConfig.API_BASE_URL}${method}`;
            
            const headers = {
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            };

            // console.log('json: ', json);
            // console.log('urlCompleta: ', urlCompleta);

            axios.put(urlCompleta, json)
            .then(response => {
                // console.log('response: ', response);
                if (response.status == 200) {
                    resolve(response.data);
                } else {
                    resolve(false);
                }
            })
            .catch(error => {
                reject(error.response.data);
            });
        });
    }
}

export default new UserServices();