import ApiConfig from './ApiConfig';
import axios from 'axios';

class UserServices {

    doLogin = async (username, password) => {
        return new Promise((resolve, reject) => {
        
            const usuarioCodificado = encodeURIComponent(username);
            const contraseniaCodificada = encodeURIComponent(password);
            
            const urlCompleta = `${ApiConfig.API_BASE_URL}/Usuarios/Login?`
                +`pUsuario=${usuarioCodificado}&`
                +`pContrasenia=${contraseniaCodificada}`;

            // console.log(urlCompleta);

            const headers = {
                // Agrega aquí las cabeceras requeridas por la API
            };
            
            axios.post(urlCompleta, {}, { headers })
            .then(function (response) {
                // console.log(response.status);
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

    postUserRegister = async (json) => {
        return new Promise((resolve, reject) => {
  
            var method = '';

            if (json.TipoUsuario == 'customer') {
                method = '/Clientes/RegistrarCliente';
            } 
            if (json.TipoUsuario == 'company') {
                method = '/Clientes/RegistrarEmpresa';
            } 

            var urlCompleta = `${ApiConfig.API_BASE_URL}${method}`;

            const headers = {
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            };

            // console.log('json: ', json);
            // console.log('urlCompleta: ', urlCompleta);
            axios.post(urlCompleta, json, { headers })
            .then(function (response) {
                // console.log('status: ',JSON.stringify(response.status));
                console.log('response: ',JSON.stringify(response.data));
                if (response.status == 200) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
            .catch(function (error) {
                reject(error.response.data);
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

    putPassword = async () => {
        return new Promise((resolve, reject) => {
  
            var method = '';
            var urlCompleta = `${ApiConfig.API_BASE_URL}${method}`;

            const headers = {
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            };

            // console.log('json: ', json);
            // console.log('urlCompleta: ', urlCompleta);
            axios.put(urlCompleta, json, { headers })
            .then(function (response) {
                // console.log('status: ',JSON.stringify(response.status));
                console.log('response: ',JSON.stringify(response.data));
                if (response.status == 200) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
            .catch(function (error) {
                reject(error.response.data);
            });
        });
    }
}

export default new UserServices();