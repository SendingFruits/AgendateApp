class ApiConfig {

    constructor() {
        //this.API_URL_TOKEN = '4bed-2800-a4-29c2-8600-cd18-1613-fcd2-d0c8.';
        this.API_BASE_URL =  'https://localhost:7170/swagger/index.html',
        //this.API_BASE_URL = 'https://'+this.API_URL_TOKEN+'.ngrok-free.app/api/';
       // this.API_LOCALHOST = 'https://192.168.1.7:9083/api/';
       // this.JWT = '123';
    }

    
    getJWT = async () => {
        return this.JWT;
    };

    putJWT = async (jwt) => {
        this.JWT = jwt;
    };


    getToken = async () => {
        return this.API_URL_TOKEN;
    };

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

    setNgrokToken = async (code) => {
        this.API_URL_TOKEN = getToken();
    }
}

export default new ApiConfig();

