class ApiConfig {

    constructor() {
        this.AZURE_HOST = 'https://agendateapp-api.azurewebsites.net/api/';
        this.LOCAL_HOST = 'https://186.48.52.221:9083/api/';
        this.NGORK_HOST = 'https://c6fa-2800-a4-c13d-ec00-d84a-6ce4-66c9-f9a8.ngrok-free.app/api/';
        this.API_BASE_URL = this.NGORK_HOST;
    }

    setURL = async () => {
        return this.API_URL_TOKEN;
    };

    getURL = async () => {
        return this.API_BASE_URL;
    };

    
    setHost = async (method) => {
        switch (method) {
            case 'Ngrok':
                break;
            case 'Localhost':
                break;
            case 'Azure':
                break;
            default:
                break;
        }
    }
}

export default new ApiConfig();

