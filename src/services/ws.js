import { Platform } from 'react-native';

const wsURL = 'ws://your-websocket-server-url'; // URL del servidor WebSocket

const connect = () => {
    const ws = new WebSocket(wsURL);

    ws.onopen = () => {
        console.log('Conexión exitosa');
        // Puedes enviar un mensaje al servidor una vez conectado
        ws.send('Hola, soy un mensaje desde el cliente');
    };

    ws.onmessage = (event) => {
        console.log('Mensaje recibido:', event.data);
        // Procesa los mensajes recibidos desde el servidor
    };

    ws.onerror = (error) => {
        console.error('Error de WebSocket:', error);
        // Maneja los errores de la conexión
    };

    ws.onclose = () => {
        console.log('Conexión cerrada');
        // Acciones cuando la conexión se cierra
    };

    return ws;
};

export default connect;