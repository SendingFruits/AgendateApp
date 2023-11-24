var URL_TOKEN = '8e6b-2800-a4-1205-f100-d1dd-ab5b-e5ac-1d3f';
var NGROK_URL = 'https://'+URL_TOKEN+'.ngrok-free.app/api/';
var LOCALHOST = 'https://192.168.1.7:9083/api';

class ApiConfig {
 
    constructor() {
        // this.API_BASE_URL = LOCALHOST;
        this.API_BASE_URL = NGROK_URL;
    }

    getURL = async () => {
        return this.API_BASE_URL;
    };

    getErrorCode = async (error) => {
        return error.split(' ')[code.length - 1];
    };

    getConnectionStatus = async (code) => {
        if (code == 200) {
            return true;
        } else {
            return false;
        }
    };

    codeMessage = async (code) => {
        if (code >= 200 && code < 300) {
            return true;
        } else if (code >= 300 && code < 400) {
            return false;
        } else if (code >= 400 && code < 500) {
            return '';
        } else if (code >= 500) {
            return 'Error de Conexión. Verifique su conexión a Internet o consulte el proveedor.';
        } else {
            reject('Error Desconocido.');    
        }
    };
}

export default new ApiConfig();