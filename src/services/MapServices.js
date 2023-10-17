import ApiConfig from './ApiConfig';
import axios from 'axios';

class MapServices {

    getCompanies = async (lat, lng, cte) => {
        // console.log('API_BASE_URL: ', ApiConfig.API_BASE_URL);
        const data = '';
        try {
            const urlCompleta = `${ApiConfig.API_BASE_URL}/Empresas/ObtenerEmpresasMapa?`
            //const urlCompleta = `http://192.168.1.7:9080/api/Empresas/ObtenerEmpresasMapa?`
                + `radioCircunferencia=${cte}&`
                + `latitudeCliente=${lat}&`
                + `longitudeCliente=${lng}`;
    
            const options = {
                method: 'GET',
                headers: {
                    'accept': 'text/json',
                    // 'verify': false
                },
            };
            console.log('urlCompleta: ',urlCompleta); 
            const response = await axios.get(urlCompleta, options);
            // console.log('response.status: ', response.status.toString());
            if (response.status) {
                // console.log('response.data: ', response.data);
                return response.data;
            } else {
                return -1;
            }

        } catch (error) {
            // console.error('Error getCompanies:', error);
            if (error.message == 'Network Error') {
                reject('Error de Conexión. Verifique su conexión a Internet o consulte el proveedor.');  
            } else {
                if (error.response.status == 404) {
                    return 'Error de Conexión. Verifique su conexión a Internet o consulte el proveedor.';    
                } else {
                    return error.response.data;
                }
            }
            
        }
    };

    getCompaniesThen = async (lat, lng, cte) => {
        // console.log('API_BASE_URL: ', ApiConfig.API_BASE_URL);
      


        // const urlCompleta = `${ApiConfig.API_BASE_URL}/Empresas/ObtenerEmpresasMapa?`
        // //const urlCompleta = `http://192.168.1.7:9080/api/Empresas/ObtenerEmpresasMapa?`
        //     + `radioCircunferencia=${cte}&`
        //     + `latitudeCliente=${lat}&`
        //     + `longitudeCliente=${lng}`;

        // const params = {
        //     radioCircunferencia: cte,
        //     latitudeCliente: lat,
        //     longitudeCliente: lng,
        //   };





        // const url = 'https://192.168.224.1:9083/api/Empresas/ObtenerEmpresasMapa?' 
        // + Object.entries(params).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');

        // console.log(url);

        // axios.get(url)
        // .then(response => {
        //     // Manejar la respuesta exitosa aquí
        //     console.log('response.data: ', response.data);
        // })
        // .catch(error => {
        //     // Manejar errores aquí
        //     console.error('error: ', error);
        // });


        fetch('https://192.168.224.1:9083/api/Empresas/ObtenerEmpresasMapa?radioCircunferencia=1&latitudeCliente=-34.8785883&longitudeCliente=-56.18071', {
            method: "GET",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
        .then((responseData) => {
            console.log(JSON.stringify(responseData));
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    };

    getCompaniesFetch = (lat, lng, cte) => {

        fetch('https://10.0.2.2:9083/api/Empresas/ObtenerEmpresasMapa?radioCircunferencia=1&latitudeCliente=-34.8785883&longitudeCliente=-56.18071')
        .then((response) => response.json())
        .then((response) => {
            console.log(JSON.stringify(response));
        });
    };
}

export default new MapServices();