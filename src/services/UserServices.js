import { API_BASE_URL } from './ApiConfig';
import axios from 'axios';

class UserServices {

    doLogin = async (username, password) => {
        return new Promise((resolve, reject) => {
        
            const usuarioCodificado = encodeURIComponent(username);
            const contraseniaCodificada = encodeURIComponent(password);
            
            const urlCompleta = `${API_BASE_URL}/Usuarios/Login?`
                +`pUsuario=${usuarioCodificado}&`
                +`pContrasenia=${contraseniaCodificada}`;

            console.log(urlCompleta);

            const headers = {
                // Agrega aquí las cabeceras requeridas por la API
            };
            
            axios.post(urlCompleta, {}, { headers })
            .then(function (response) {
                // console.log('JSON: ',JSON.stringify(response.data));
                resolve(JSON.stringify(response.data))
            })
            .catch(function (error) {
                console.log(error);
                reject(error);
            });
            
        });
    };

    postUserRegister = async (json) => {
        return new Promise((resolve, reject) => {
            console.log('json: ', json);

            var type = '';
            var method = '';
            var dataBody = JSON.stringify(json);

            if (json.tipoUsuario == 'customer') {
                method = '​/Clientes​/RegistrarCliente';
                type = 'customer';
            } 

            if (json.tipoUsuario == 'company') {
                method = '​/Empresas​/RegistraseEmpresa';
                type = 'company';
            } 

            var config = {
                method: 'post',
                url: `${API_BASE_URL}${method}`,
                headers: { 
                    'Content-Type': 'application/json', 
                    'Accept': 'application/json'
                },
                data : dataBody
            };

            console.log('config: ', config);

            axios(config)
            .then(function (response) {
                console.log('response: ',JSON.stringify(response.data));
                // resolve(JSON.stringify(response.data))
            })
            .catch(function (error) {
                console.log(error);
                // reject(error);
            });
        });
    };
    
    putUserData = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
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