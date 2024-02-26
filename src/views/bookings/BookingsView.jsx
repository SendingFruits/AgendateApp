import { 
    AuthContext 
} from '../../context/AuthContext';

import { useNavigation } from '@react-navigation/native';
import { formatDate, getFormattedDate } from '../../views/utils/Functions'; 

import BookingItem from './BookingItem';
import FilterPanel from './FilterPanel';
import BookingController from '../../controllers/BookingController';
import ServicesController from '../../controllers/ServicesController';

import React, { 
    useContext, useState, useEffect
} from 'react';

import { 
    Text, 
    StyleSheet, 
    View, 
    ScrollView,
    RefreshControl,
} from 'react-native';

const BookingsView = ( params ) => {

    const navigation = useNavigation();
    const { currentUser } = useContext(AuthContext);
    var guid = currentUser.guid;
    var type = currentUser.type;
    // console.log(guid);

    const [list, setList] = useState([]);
    const [counter, setCounter] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [dateSelected, setDateSelected] = useState(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
            loadBookings(guid, type);

            if (type === 'company') {
                navigation.navigate('Agenda');
            } else {
                navigation.navigate('Reservas');
            }
		}, 2000);
	}, []);

    const loadBookings = (guid, type) => {
        if (type === 'customer') {
            BookingController.getBookingsForCustomer(guid)
            .then(bookingsReturn => {
                // console.log('bookingsReturn: ', bookingsReturn);
                setList(bookingsReturn);
                // console.log('bookings: ', bookings);
                // ecualList = (bookings === list) ? true : false;
                // console.log('ecualList: ', ecualList);
            })
            .catch(error => {
                alert('ERROR al intentar cargar las Reservas del Cliente '+error);
            });
        } else {
            ServicesController.getServicesForCompany(guid)
            .then(serviceReturn => {
                // console.log('serviceReturn: ', serviceReturn);
               
                if (serviceReturn !== null) {        
                    BookingController.getBookingsForCompany(serviceReturn.id,dateSelected)
                    .then(bookingsReturn => {
                        // console.log('bookings: ', bookingsReturn);
                        // console.log('length: ', bookingsReturn.length);
                        if (bookingsReturn.length > 0) {
                            setCounter(bookingsReturn.length);
                            setList(bookingsReturn);
                        } else {
                            setCounter(0);
                            setList([]);
                        }
                    })
                    .catch(error => {
                        alert('ERROR al intentar cargar las Reservas de la Empresa '+error);
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    const showDatePicker= () => {
        setDatePickerVisibility(true);      
    }

    useEffect(() => {
        if (dateSelected === null) 
            setDateSelected(getFormattedDate());
        loadBookings(guid, type);
    }, [guid, type, dateSelected]);

    // console.log('list: ', list);

    return (
        <View style={styles.container}>
           
            {type === 'company' ? (
                <>
                    <FilterPanel
                        onRefresh={onRefresh}
                        dateSelected={dateSelected}
                        setDateSelected={setDateSelected}
                        showModal={showModal}
                        setShowModal={setShowModal}
                        />
                    <View 
                        style={{ paddingVertical:25 }}
                        />
                </>
            ) : null }

            {/* {(list !== null || (Array.isArray(list) && list.length !== 0)) ? ( */}
            {(list.length !== 0) ? (
                <ScrollView 
                    contentContainerStyle={styles.scrollContainer}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }>
                        
                    {list.map((item, index) => (
                        <View key={index}>
                            <BookingItem 
                                index={index}
                                type={type}
                                item={item} 
                                onRefresh={onRefresh}
                            />
                        </View>
                    ))}
                </ScrollView>
            ) : (
                <View>
                    <Text>No hay Reservas para el {formatDate(dateSelected)}</Text>
                </View>
            )}
          
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e9e9f8',
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