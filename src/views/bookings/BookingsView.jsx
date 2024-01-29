import { useNavigation } from '@react-navigation/native';
import { formatDate, getFormattedDate } from '../../views/utils/Functions'; 

import BookingItem from './BookingItem';
import FilterPanel from './FilterPanel';
import BookingController from '../../controllers/BookingController';
import ServicesController from '../../controllers/ServicesController';

import React, { 
    useState, useEffect
} from 'react';

import { 
    Text, 
    StyleSheet, 
    View, 
    ScrollView,
    RefreshControl,
} from 'react-native';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

const BookingsView = ( params ) => {

    const navigation = useNavigation();


    var guid = params.route.params.guid;
    var type = params.route.params.type;

    
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
                // console.log('dateSelected: ', dateSelected);
               
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
                
            })
            .catch(error => {
                alert('ERROR al intentar cargar los Servicios, ' + error);
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
            ) : (
                <></>
            ) }

            {/* {(list !== null || (Array.isArray(list) && list.length !== 0)) ? ( */}
            {(list.length !== 0) ? (
                <ScrollView 
                    style={styles.scrollContainer}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }>
                    {list.map((item, index) => (
                        <View key={item.id}>
                            <BookingItem 
                                index={index}
                                type={type}
                                item={item} 
                                onRefresh={onRefresh}
                            />
    
                            {/* <Text key={index}>{item.costo}</Text> */}
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

const DatePicker = ( params ) => {
    return (
        <View style={stylesPicker.row}>
        <View style={stylesPicker.columnT}>
            <Text style={stylesPicker.label}>Termina:</Text>
        </View>
            <View style={stylesPicker.columnV}>
                <TouchableOpacity onPress={(param) => showDatePicker('termino')}>
                    <TextInput 
                        editable={false}
                        style={stylesPicker.dataEdit} 
                        value={terminoHora.toString()}
                        />
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible2}
                    mode="time"
                    display="spinner"
                    is24Hour={true}
                    date = {selectedDatePicker2}
                    minuteInterval={30}
                    onConfirm={(date) => handleDateConfirm(date,'termino')}
                    onCancel={() => setDatePickerVisibility2(false)}
                    />
            </View>
        </View>
    );
}

const stylesPicker = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#000',

    },
    columnT: {
        width:'30%',
        paddingLeft:5,
        // backgroundColor:'red',
    },
    columnV: {
        width:'70%',
        paddingRight:1,
        alignItems:'stretch',
        // backgroundColor:'green',
    },

    label: {
        fontWeight:'bold',
    },
});

export default BookingsView;