import { useNavigation } from '@react-navigation/native';

import BookingItem from './BookingItem';
import BookingController from '../../controllers/BookingController';

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
} from 'react-native';

import SQLiteHandler from '../../services/database/SQLiteHandler';


const BookingsView = ( params ) => {

    const navigation = useNavigation();

    var guid = params.route.params.guid;

    const [list, setList] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const handleEditItem = (service) => {
        // Navegar a la vista de edición con los datos del servicio
        // navigation.navigate('ServiceEdit', { service });
    };

    const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
			navigation.navigate('Reservas');
		}, 2000);
	}, []);

    useEffect(() => {
        // ServicesController.getServicesForCompany(idCompany)
        // .then(serviceReturn => {
        //     // var services = JSON.parse(serviceReturn);
        //     // console.log('services: ', serviceReturn);
        //     setListServices(serviceReturn);
        // })
        // .catch(error => {
        //     alert('ERROR al intentar cargar los Servicios');
        // });

        SQLiteHandler.selectReservasCliente(guid)
        .then(bookings => {
            setList(bookings);
        })
        .catch(error => {
            alert('ERROR al intentar cargar las Reservas');
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
                        <BookingItem 
                            key={index}
                            item={item} 
                            onPress={() => handleEditItem(item)} 
                        />
                    ))}
                </ScrollView>
            ) : (
                <View>
                    <Text>No tiene ninguna Reserva Realizada</Text>
                </View>
            )}
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
        paddingBottom: 5,
    },
});

export default BookingsView;