class ApiConfig {

    constructor() {
        this.AZURE_HOST = 'https://agendateapp-api.azurewebsites.net/api/';
        this.LOCAL_HOST = 'https://186.48.52.221:9083/api/';
        this.NGORK_HOST = 'https://44ef-2800-a4-c0be-1300-ed5f-43dc-717c-86cd.ngrok-free.app/api/';
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

