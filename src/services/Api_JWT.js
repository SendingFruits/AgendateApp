import { AsyncStorage } from 'react-native';
import axios from 'axios';
import jwt_decode from 'jwt-decode'; // Para decodificar el token JWT

class Api_JWT {

    login = async () => {
        try {
          // Llamada a la API para autenticar al usuario y obtener el token
          const response = await axios.post('URL_DE_TU_ENDPOINT_DE_LOGIN', {
            username: 'usuario',
            password: 'contraseña',
          });
    
          const { token } = response.data;
    
          // Almacenar el token en AsyncStorage
          await AsyncStorage.setItem('token', token);
          setToken(token);
        } catch (error) {
          Alert.alert('Error', 'Nombre de usuario o contraseña incorrectos');
        }
    };
    
    logout = async () => {
        // Eliminar el token de AsyncStorage
        await AsyncStorage.removeItem('token');
        setToken(null);
    };
    
    fetchData = async () => {
        try {
          const response = await axios.get('URL_DE_TU_ENDPOINT_PROTEGIDO', {
            headers: {
              Authorization: `Bearer ${token}`, // Incluir el token en el encabezado de la solicitud
            },
          });
          // Procesar la respuesta...
        } catch (error) {
          if (error.response && error.response.status === 401) {
            // Token inválido o expirado, manejar la autenticación nuevamente
            Alert.alert('Error', 'Token inválido o expirado');
            logout();
          } else {
            // Otro error, manejar según sea necesario
            console.error('Error:', error.message);
          }
        }
    };
}

const Api_JWT = () => {
  
  useEffect(() => {
    // Verificar si hay un token almacenado en AsyncStorage al cargar la aplicación
    AsyncStorage.getItem('token').then((storedToken) => {
      if (storedToken) {
        setToken(storedToken);
      }
    });
  }, []);

};

export default Api_JWT;