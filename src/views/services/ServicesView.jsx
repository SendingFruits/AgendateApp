import { useNavigation } from '@react-navigation/native';

import ServiceItem from './ServiceItem';
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


const ServicesView = ( {route} ) => {

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

            { (listServices.length > 0) ? (
                <ScrollView style={styles.scrollContainer}>
                    {listServices.map((service, index) => (
                        <ServiceItem 
                            key={index}
                            service={service} 
                            onPress={handleEditService} 
                            />
                    ))}
                </ScrollView>
            ) :
                <View>
                    <Text>No tiene un servicio creado aún</Text>
                    <View>        
                        <TouchableOpacity style={styles.btnCreate} > 
                            <Text style={styles.textCreate} >Crear</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            }

            <View style={styles.footer}>
                <Text style={styles.textVersion1}>En esta versión solo puede tener un servicio</Text>
                <Text style={styles.textVersion2}>Necesita actualizar a la versión Premium</Text>
                <View>        
                </View>
            </View>
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
    footer: {
        width:'95%',
        alignItems:'center',
        borderTopColor:'#011',
        borderTopWidth:0.6,
    },
    textVersion1: {
        fontWeight:'bold',
        paddingHorizontal:6,
        paddingVertical:10,
    },
    textVersion2: {
        paddingHorizontal:3,
        paddingBottom: 5,
    },
});

export default ServicesView;