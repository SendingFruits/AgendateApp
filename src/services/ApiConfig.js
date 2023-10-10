var URL_TOKEN = '8b51-2800-a4-136c-2900-a9f3-c1b4-620a-bd55';
var NGROK_URL = 'https://'+URL_TOKEN+'.ngrok-free.app/api';
var LOCALHOST = 'https://10.0.2.2/api';

class ApiConfig {
 
    constructor() {
        this.API_BASE_URL = LOCALHOST;
        //this.API_BASE_URL = NGROK_URL;
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