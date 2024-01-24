import { formatDate, formatDate2 } from '../utils/Functions'

import React, { useState, useEffect } from 'react';

import { 
    View, 
    Button,
    TouchableOpacity, 
    StyleSheet, 
    Text, 
    ScrollView, 
    ActivityIndicator,
    Modal
} from 'react-native';
import { Calendar } from 'react-native-calendars';

import SchedulesController from '../../controllers/SchedulesController';
import BookingController from '../../controllers/BookingController';

import AlertModal from '../utils/AlertModal';
import ScheduleList from './ScheduleList';

import AsyncStorage from '@react-native-async-storage/async-storage';

const CalendarPicker = ( params ) => {

    var id_comp = params.compId;
    var id_server = params.service.id;

    const [selectedDate, setSelectedDate] = useState(null);
    const [availableTimes, setAvailableTimes] = useState([]);

    const [isDataVisible, setDataVisible] = useState(false);
	const [isTimePickerVisible, setTimePickerVisible] = useState(false);
    const [isScheduleListVisible, setScheduleListVisible] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingSchedules, setIsLoadingSchedules] = useState(true);

    const markedDates = {};
    const disabledDates = {};

    const spanishMonthNames = {
        enero: 'Enero',
        febrero: 'Febrero',
        marzo: 'Marzo',
        abril: 'Abril',
        mayo: 'Mayo',
        junio: 'Junio',
        julio: 'Julio',
        agosto: 'Agosto',
        septiembre: 'Septiembre',
        octubre: 'Octubre',
        noviembre: 'Noviembre',
        diciembre: 'Diciembre',
    };

    
	const [selectedHour, setSelectedHour] = useState(null);
	const [showModal, setShowModal] = useState(false);



    const getAsyncStorageData = async () => {
        const keys = await AsyncStorage.getAllKeys();
        const values = await AsyncStorage.multiGet(keys);
        // console.log('values: ', values);
    } 

    const getCompanyData = async () => {
        var dataCompany = await AsyncStorage.getItem('dataCompany');
        console.log('dataCompany: ', dataCompany);
        if (dataCompany !== null) {
            var companyJSON = JSON.parse(dataCompany);
            // console.log('serviceJSON: ', serviceJSON);
            if (companyJSON !== null) {
                setCompanyData(companyJSON);
                // console.log('serverSelectId: ', serverSelectId);
            }
        }
    }

    const getServiceId = async () => {
        var selectedService = await AsyncStorage.getItem('selectedService');
        console.log('selectedService: ', selectedService);
        if (selectedService !== null) {
            var serviceJSON = JSON.parse(selectedService);
            // console.log('serviceJSON: ', serviceJSON);
            if (serviceJSON !== null) {
                setServerSelectId(serviceJSON.id);
                // console.log('serverSelectId: ', serverSelectId);
            }
        }
    }

    const handleDateSelect = (day) => {

        SchedulesController.getSchedulesForService(id_server,day.dateString)
        .then(schedulesReturn => {
            // console.log('schedulesReturn: ', schedulesReturn);        

            if (schedulesReturn !== null) {
                setAvailableTimes(schedulesReturn.resultado);    
            } else {
                setAvailableTimes([]);
            }

            setIsLoading(false);
            setSelectedDate(day.dateString);
            setScheduleListVisible(true); 
            setTimePickerVisible(true);
        })
        .catch(error => {
            setIsLoading(false);
            alert(error); 
        });

    };


    const createReservation = (item) => {
		// console.log(item);
		// setSelectedItem(item);
		setSelectedHour(item.fechaHora);
		setShowModal(true);

		setTimeout(() => {
			setShowModal(false);
		}, 10000);
	};

	const confirmReservation = (hour) => {
		console.log(hour);

		const formData = {
			idCliente,
			idServicio,
			fechaHoraTurno,
			estado,
		};

		BookingController.handleCreateBooking(formData)
		.then(userReturn => {
			// console.log('userReturn: ', userReturn);
			if (userReturn) {
				alert('Se realizó la Reserva con éxito');
				navigation.navigate('Realizar Reserva', { userLogin, item });
			}
		})
		.catch(error => {
			alert(error);
		});

		// {
		// 	"id": 0,
		// 	"idCliente": 0,
		// 	"idServicio": 0,
		// 	"fechaHoraTurno": "2024-01-14T23:52:03.570Z",
		// 	"estado": "string"
		// }
	};


    useEffect(() => {
        setSelectedDate(null);
        setAvailableTimes([]);

        setShowModal(false);
        setIsLoading(false);
        setIsLoadingSchedules(false);

        // setFilteredTimes([]);
        // filterTimes();
	}, [id_comp, isLoadingSchedules]);

	return ( 
        <View>
            <Calendar
                style={styles.calendar}
                theme={{
                    backgroundColor: '#ffffff',
                    calendarBackground: '#ffffff',
                    textSectionTitleColor: '#b6c1cd',
                    selectedDayBackgroundColor: '#00adf5',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#00adf5',
                    dayTextColor: '#2d4150',
                    textDisabledColor: '#d9e1e8',
                    dotColor: '#00adf5',
                    selectedDotColor: '#ffffff',
                    arrowColor: 'orange',
                    monthTextColor: 'blue',
                    indicatorColor: 'blue',
                }}
                // disableTouchEvent={false}
                markedDates = {markedDates}
                onDayPress={(day) => handleDateSelect(day)}
                markingType="multi-dot"
                disabledDates={disabledDates}
                monthNames={spanishMonthNames}
            />

            {isLoadingSchedules ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <View style={styles.container}>
                    {availableTimes !== null && availableTimes.length > 0 ? (
                    <View>
                        <Text style={styles.title}>Horarios para el dia {formatDate(selectedDate)}</Text>
                        {/* {console.log('filteredTimes: ', filteredTimes)} */}
    
                        <ScrollView>
                            {availableTimes.map((item, index) => (
                                <View key={index}>
    
                                    <TouchableOpacity onPress={() => createReservation(item)}>
                                        <View style={styles.scheduleItem}>
                                        <Text style={styles.hourItem}>Agendate para las {formatDate2(item.fechaHora)}</Text>
                                        <Text style={[styles.statusItem, { color: item.disponible ? 'green' : 'red' }]}>
                                            {item.disponible ? 'Libre' : 'Ocupado'}
                                        </Text>
                                        </View>
                                    </TouchableOpacity>
    
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                ) : null }
    
                <Modal
                    animationType="slide"
                    visible={showModal}
                    transparent={true}
                    >
                    <View style={styles.modal}>
                        <TouchableOpacity
                            style={styles.closeModal}
                            onPress={() => setShowModal(false)}
                        >
                            <Text style={styles.cross}>X</Text>
                        </TouchableOpacity>
                        <View>
                            <Text style={styles.textConfirm}>
                                Agendate para el dia {"\n"} {formatDate(selectedDate)} a las {formatDate2(selectedHour)}
                            </Text>
                            <Button
                                title="Confirmar"
                                onPress={() => {
                                    confirmReservation(selectedHour);
                                    setShowModal(false);
                                }} />
                        </View>
                    </View>
                </Modal>
            </View>
            )}
           
        </View>
	);
};

const styles = StyleSheet.create({
	calendar: {
        // height: '25%',
		backgroundColor: '#e3e0ef',
	},
    title: {
		alignSelf:'center',
		marginTop: 3,
		padding: 2,
		color:'#000000',
		fontWeight:'bold',
		backgroundColor:'#e3eeee',
		width:'100%',
		textAlign:'center'
	},
	scheduleItem: {
		flexDirection: 'row',
		paddingVertical: 4,
		paddingHorizontal: 20,
		marginTop: 5,
		marginBottom: 5,
		borderBottomColor: '#8DA9A4',
		borderBottomWidth: 1,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
	},
	hourItem: {
		fontWeight: 'normal',
		marginRight: 20,
	},
	statusItem: {
		fontWeight: 'bold',
		textAlign: 'right',
	},
	modal: {
		width: 360,
		height: 220,
		alignSelf: 'center',
		marginHorizontal: 40,
		marginVertical: 220,
		paddingHorizontal: 10,
		paddingVertical: 20,
		borderRadius: 20,
		borderColor: 'green',
		borderWidth: 1,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
	},
	closeModal: {
		position: 'absolute',
		top: 10,
		right: 10,
		borderRadius: 15,
		width: 30,
		height: 30,
		justifyContent: 'center',
		alignItems: 'center',

	},
	cross: {
		color: 'green',
	},
	textConfirm: {
		fontSize: 21,
		textAlign: 'center',
		marginHorizontal: 2,
		marginVertical: 2,
		paddingHorizontal: 6,
		paddingVertical: 6,
	},
});

export default CalendarPicker;