var URL_TOKEN = '2b2e-2800-a4-137f-2a00-31d2-35e6-2e49-c806';
var NGROK_URL = 'https://'+URL_TOKEN+'.ngrok-free.app/api';
var LOCALHOST = 'https://localhost:7071/api';

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