var URL_TOKEN = 'c042-2800-a4-122b-5900-783b-82f4-23a9-29b9';
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
}

export default new ApiConfig();