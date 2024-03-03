class ApiConfig {

    constructor() {
        this.API_URL_TOKEN = '30d3-2800-a4-c1d9-d400-98c6-6433-acd6-3f30';
        this.API_BASE_URL = 'https://'+this.API_URL_TOKEN+'.ngrok-free.app/api/';
        this.API_LOCALHOST = 'https://192.168.1.7:9083/api/';
        // this.API_BASE_URL = 'https://186.48.52.221:9083/api/';
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

