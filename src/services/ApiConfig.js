var URL_TOKEN = '0a9d-2800-a4-120f-8a00-2ce2-50fa-a1a3-859c';
var NGROK_URL = 'https://'+URL_TOKEN+'.ngrok-free.app/api';
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

    getMessage = async (code) => {
        switch (code) {
            case 200:
                return true;
                break;
            case 404:
                return 'Error de conexión.';
                break;
        
            default:
                return 'Error de conexión.'
                break;
        }
    };
}

export default new ApiConfig();