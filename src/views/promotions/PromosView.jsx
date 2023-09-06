import { useNavigation } from '@react-navigation/native';

import PromoItem from './PromoItem';
import ServicesController from '../../controllers/ServicesController';

import React, { 
    useState,
    useEffect
} from 'react';

import { 
    Text, 
    StyleSheet, 
    View, 
    ScrollView ,
    TouchableOpacity
} from 'react-native';


const PromosView = ( {route} ) => {

    const navigation = useNavigation();
    const [listServices, setListServices] = useState([]);

    const { userLogin } = route.params;
    var idCompany = userLogin.guid;

    useEffect(() => {
        const fetchData = async () => {
			try {
                const serviceReturn = await ServicesController.getServicesForCompany(idCompany);
				console.log(serviceReturn);
                setListServices(serviceReturn);
                // traer servicios
                // ServicesController.getServicesForCompany(idCompany)
                // .then(serviceReturn => {
                //     // var services = JSON.parse(serviceReturn);
                //     console.log('services: ', serviceReturn);
                //     // setListServices(serviceReturn);
                // })
                // .catch(error => {
                //     alert('ERROR al intentar cargar los Servicios');
                // });
			} catch (error) {
				console.log('ERROR fetchData: '+error);
			}
		};
        fetchData();

    }, []);

    
    const handleEditService = (service) => {
        // Navegar a la vista de edición con los datos del servicio
        navigation.navigate('ServiceEdit', { service });
    };

    return (
        <View style={styles.container}>

            {/* { (listServices.length > 0) ? (
                <ScrollView style={styles.scrollContainer}>
                    {listServices.map((service, index) => (
                        <PromoItem 
                            service={service} 
                            onPress={handleEditService} 
                            />
                    ))}
                </ScrollView>
            ) :
                <View>
                    <Text>No tiene una promoción creada aún</Text>
                    <View>        
                        <TouchableOpacity style={styles.btnCreate} > 
                            <Text style={styles.textCreate} >Crear</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            } */}

            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollContainer: {
        flex: 1,
        width: '100%',
    },
    btnCreate: {
        width: 50,
        position: 'relative',
        top: 60,
        left: 197,
        padding: 8,
        backgroundColor: '#AAA54E', // Color de fondo del botón
        borderRadius: 10,
    },
    textCreate: {
        color:'#ffffff'
    },
});

export default PromosView;