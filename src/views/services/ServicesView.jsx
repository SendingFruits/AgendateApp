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
    ScrollView,
    RefreshControl,
    TouchableOpacity
} from 'react-native';

import SQLiteHandler from '../../services/database/SQLiteHandler';


const ServicesView = ( params ) => {

    const navigation = useNavigation();

    var guid = params.route.params.guid;

    const [list, setList] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const handleEditItem = (service) => {
        // Navegar a la vista de edición con los datos del servicio
        // navigation.navigate('ServiceEdit', { service });
    };

    const createItem = (guid) => {
        console.log('create', guid);
    };

    const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
			navigation.navigate('Servicios');
		}, 2000);
	}, []);

    useEffect(() => {
        ServicesController.getServicesForCompany(guid)
        .then(serviceReturn => {
            // var services = JSON.parse(serviceReturn);
            console.log('services: ', serviceReturn);
            setListServices(serviceReturn);
        })
        .catch(error => {
            alert('ERROR al intentar cargar los Servicios');
        });

    }, []);

    console.log('list: ', list);

    return (
        <View style={styles.container}>

            {list ? (
                <ScrollView 
                    style={styles.scrollContainer}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }>
                    {list.map((item, index) => (
                        <ServiceItem 
                            key={index}
                            item={item} 
                            onPress={() => handleEditItem(item)} 
                        />
                    ))}
                </ScrollView>
            ) : (
                <View style={styles.scrollContainer}>
                    <Text>No tiene ningún Servicio Creado</Text>

                    <TouchableOpacity 
                        style={styles.btnCreate}
                        onLongPress={() => createItem(guid)} 
                        >
                        <Text> Crear Servicio </Text>
                    </TouchableOpacity>
                </View>
            )}

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
        alignItems:'center',
        width: '100%',
    },
    btnCreate: {
        padding:10,
        marginHorizontal:20,
        marginVertical:30,
        backgroundColor: '#135944', // Color de fondo del botón
        borderRadius: 10,
    },
    textCreate: {
        color:'#ffffff'
    },
    footer: {   
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,     
        textAlignVertical:'bottom',
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
        paddingBottom: 20,
    },
});

export default ServicesView;