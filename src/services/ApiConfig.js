class ApiConfig {

    constructor() {
        this.AZURE = 'https://192.168.1.7:9083/api/';
        this.LOCAL = 'https://186.48.52.221:9083/api/';
        this.NGORK_TOKEN = 'ef62-2800-a4-c076-cc00-d88d-eb58-e5f6-9143';
        this.API_BASE_URL = 'https://'+this.NGORK_TOKEN+'.ngrok-free.app/api/';
    }

    getToken = async () => {
        return this.API_URL_TOKEN;
    };

    getURL = async () => {
        return this.API_BASE_URL;
    };

    setNgrokToken = async (code) => {
        this.API_URL_TOKEN = getToken();
    }
}

export default new ApiConfig();

