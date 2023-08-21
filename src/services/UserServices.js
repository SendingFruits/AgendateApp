import { API_BASE_URL } from './ApiConfig';
import axios from 'axios';

class UserServices {

    doLogin = async (username, password) => {

        console.log('','');

        try {
            // const response = await fetch(`${API_BASE_URL}/Usuarios/Login?usuario=${username}&contrasenia=${password}`, {});

            const response = await fetch(`${API_BASE_URL}/Usuarios/Login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    usuario: username,
                    contrasenia: password,
                }),
            });
            
            console.log('response: ',response);

            // if (!response.ok) {
            //     throw new Error('Credenciales Incorrectas');
            // }

            const data = response.json();
            console.log(data);
        
            // Devolver el usuario o el token de sesión
            // return data;
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }

     
        // try {
        //     console.log(API_BASE_URL);
        //     const response = await axios.post(`${API_BASE_URL}/Usuarios/Login`,  {
        //         usuario: username,
        //         contrasenia: encodeURIComponent(password),
        //     }, {
        //         headers: {
        //             'Content-Type': 'application/json',
        //         }
        //     });
            
        //     console.log('Respuesta:', response);

        //     // Aquí puedes manejar la respuesta del servidor (response.data)
        //     console.log('Respuesta del servidor:', response.data);
        
        //     // Por ejemplo, si el servidor devuelve un token JWT, puedes almacenarlo en el estado de tu aplicación o en AsyncStorage.
        
        // } catch (error) {
        //     // Manejo de errores
        //     console.error('Error en la solicitud:', error);
        // }


        // retorna:
        // {
        //     "rutDocumento": "123456789012",
        //     "razonSocial": "Razon Social X",
        //     "nombrePropietario": "Kevin",
        //     "rubro": "Peluqueria de pelados",
        //     "calle": "Silomonto lo meo",
        //     "numeroPuerta": "4",
        //     "ciudad": "La Costa City",
        //     "descripcion": "Peluquerias de peluqueria",
        //     "id": 1,
        //     "nombreUsuario": "kmiranda",
        //     "nombre": "Kevin",
        //     "apellido": "Miranda",
        //     "contrasenia": "006A2C8BF2485DF64E9CED47D3CEE89A251CA61E7C313FF0686621F247C003CA",
        //     "celular": "098760127",
        //     "correo": "kmiranda@gmail.com",
        //     "tipoUsuario": "Empresa"
        // }
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