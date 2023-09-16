import { API_BASE_URL } from './ApiConfig';
import axios from 'axios';

class UserServices {

    doLogin = async (username, password) => {

        // try {
        //     const usuarioCodificado = encodeURIComponent(username);
        //     const contraseniaCodificada = encodeURIComponent(password);

        //     const urlCompleta = `${API_BASE_URL}/Usuarios/Login`;
        //     console.log(urlCompleta);
            
        //     const dataJson = {
        //         pUsuario: usuarioCodificado,
        //         pContrasenia: contraseniaCodificada,
        //     };

        //     const options = {
        //         method: 'POST',
        //         headers: {
        //             'accept':' */*',
        //         },
        //         body: JSON.stringify(dataJson)
        //     };
    
        //     console.log(options);

        //     const response = axios(urlCompleta, options);
        //     console.log(response);


        //     // if (!response.data) {
        //     //     throw new Error('Error al obtener Usuario');
        //     // }
        //     // const data = response.data;
        //     // console.log(data);
        //     // return data;
        // } catch (error) {
        //     console.error('Error doLogin:', error);
        //     throw error;
        // }

        return new Promise((resolve, reject) => {
        
            // Codifica los valores de los parámetros para evitar problemas con caracteres especiales
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
                console.log('JSON: ',JSON.stringify(response.data));
                resolve(JSON.stringify(response.data))
            })
            .catch(function (error) {
                console.log(error);
                reject(error);
            });
            
        });
    };

    postUserRegister = async (json) => {
        try {
            const response = await fetch(`${API_BASE_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(json),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error postUserRegister:', error);
            throw error;
        }
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