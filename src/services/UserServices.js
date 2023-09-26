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

            console.log(urlCompleta);

            const headers = {
                // Agrega aquí las cabeceras requeridas por la API
            };
            
            axios.post(urlCompleta, {}, { headers })
            .then(function (response) {
                resolve(JSON.stringify(response.data))
            })
            .catch(function (error) {
                reject(error);
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
    
    putUserData = async () => {
        try {
            const response = await fetch(`${ApiConfig.API_BASE_URL}/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUserData),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            return data; // Esto sería el objeto de usuario actualizado
        } catch (error) {
            console.error('Error putUserData:', error);
            throw error;
        }
    };
}

export default new UserServices();