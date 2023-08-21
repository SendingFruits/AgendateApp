import { API_BASE_URL } from './ApiConfig';
import axios from 'axios';

class UserServices {

    doLogin = async (username, password) => {
        try {  
            // Codifica los valores de los parámetros para evitar problemas con caracteres especiales
            const usuarioCodificado = encodeURIComponent(username);
            const contraseniaCodificada = encodeURIComponent(password);
            // Construye la URL con los parámetros codificados
            const urlCompleta = `${API_BASE_URL}/Usuarios/Login?usuario=${usuarioCodificado}&contrasenia=${contraseniaCodificada}`;
            // Configura las cabeceras si es necesario (por ejemplo, Content-Type o Authorization)
            const headers = {
                // Agrega aquí las cabeceras requeridas por la API
            };
            
            axios.post(urlCompleta, {}, { headers })
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                return JSON.stringify(response.data);
            })
            .catch(function (error) {
                throw new Error(error);
                return null;
            });
        } catch (error) {
            throw error;
        }
    };

    getUsers = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/users`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
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
            console.error('Error fetching users:', error);
            throw error;
        }
    };

    getCompanies = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/Empresas`);

            // const response = await fetch(`${API_BASE_URL}/login`, {
            //     method: 'GET',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ username, password }),
            // });

            if (!response.ok) {
                throw new Error('Error al obtener Empresas');
            }
            const data = await response.json();

            console.log(data);
            return data;
        } catch (error) {
            console.error('Error:', error);
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
            console.error('Error updating user data:', error);
            throw error;
        }
    };
}

export default new UserServices();