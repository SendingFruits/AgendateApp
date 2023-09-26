var URL_TOKEN = 'cebc-2800-a4-12fb-b100-e0fe-d975-cb4b-e587';
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