import { UserContext } from '../../services/context/context'; 
import { formatDate, formatDate2 } from '../utils/Functions'

import React, { 
	useState, useEffect, useContext, useRef 
} from 'react';

import { 
	View, 
	Button,
	TouchableOpacity,
	RefreshControl,
	StyleSheet, 
	Text, 
	ScrollView, 
	ActivityIndicator,
	Modal,
} from 'react-native';
 
import { Calendar, LocaleConfig } from 'react-native-calendars';

import ServicesController from '../../controllers/ServicesController';
import UsersController from '../../controllers/UsersController';
import BookingController from '../../controllers/BookingController';
import SchedulesController from '../../controllers/SchedulesController'

import AlertModal from '../utils/AlertModal';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MakeReservation = ({ route }) => {
	
	// console.log(route);

	const { userPreferences, setUserPreferences } = useContext(UserContext);
	var user = userPreferences.current_user;
	var [compId, setCompId] = useState(null);

	const navigation = useNavigation();
	const scrollViewRef = useRef(null);

    const [selectedDate, setSelectedDate] = useState(null);
    const [availableTimes, setAvailableTimes] = useState([]);

    const [isInforVisible, setInforVisible] = useState(false);
	const [isCalendarVisible, setCalendarVisible] = useState(false);
	const [isSchedulesVisible, setSchedulesVisible] = useState(false);

	const [company, setCompany] = useState({});
	const [service, setService] = useState({});

	const [isLoading, setIsLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
	
	const [isLoadingSchedules, setLoadingSchedules] = useState(true);
	const [isTimePickerVisible, setTimePickerVisible] = useState(false);


	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			fetchData();
			setRefreshing(false);
			setInforVisible(true);
			setCalendarVisible(true);
			setSchedulesVisible(false);
			navigation.navigate('Realizar Reserva');
		}, 2000);
	}, [compId]);
	
	
	const getCompanyIdStorage = async () => {
		return new Promise((resolve, reject) => {
			try {
				var id = AsyncStorage.getItem('selectedCompanyID');
				resolve(id);
			} catch (error) {
				reject(null);
			}
		});
    }


	const getCompany = async (id) => {
		try {
			const companyReturn = await UsersController.getCompanyData(id);
			// console.log('companyReturn ', companyReturn);
			if (companyReturn !== null) {
				setCompany(companyReturn);
			}
		} catch (error) {
			alert('ERROR al intentar cargar los Servicios, ' + error);
		}
	}

	const getService = async (id) => {
		try {
			const serviceReturn = await ServicesController.getServicesForCompany(id);
			// console.log('serviceReturn ', serviceReturn);
			if (serviceReturn !== null) {
				setService(serviceReturn);
				setIsLoading(false);
				// saveServiceStorage();
			} else {
				setService(null);
				setIsLoading(true);
			}
		} catch (error) {
			alert('ERROR al intentar cargar los Servicios, ' + error);
		}
    }

	const fetchData = async () => {
		
		getCompanyIdStorage()
		.then(id => {
			// console.log('id ', id);
			setCompId(id);
			getCompany(id);
			getService(id);
		})
		.catch(error => {
			alert('ERROR al intentar cargar la Empresa, ' + error);
		});

	};


	useEffect(() => {
		setInforVisible(true);
		setCalendarVisible(true);
		fetchData();

		setSelectedDate(null);
        setAvailableTimes([]);

        setLoadingSchedules(false);

		setInforVisible(true);
        setCalendarVisible(true);
		setSchedulesVisible(false);

	}, [compId,route]);

	return ( 
		<ScrollView 
			style={stylesMake.container}
			ref={scrollViewRef}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			>

			{isInforVisible ? (
				<View>
					<View>
						<Text style={stylesMake.title}>{company.razonSocial}</Text>
					</View>
					
					<View>
						<View style={stylesMake.row}>
							<Text style={stylesMake.label}>Descripción: </Text>
							<Text style={stylesMake.value}>{company.descripcion}</Text>
						</View>
						<View style={stylesMake.row}>
							<Text style={stylesMake.label}>Rubro: </Text>
							<Text style={stylesMake.value}>{company.rubro}</Text>
						</View>
						<View style={stylesMake.row}>
							<Text style={stylesMake.label}>Dirección: </Text>
							<Text style={stylesMake.value}>{company.direccion}</Text>
						</View>
					</View>

					<View>
						{service !== null ? (
							<View>
								<View style={stylesMake.row}>
									<Text style={stylesMake.label}>Servicio: </Text>
									<Text style={stylesMake.value}>{service.nombre}{"\n"}{service.descripcion}</Text>
								</View>
								<View style={stylesMake.row}>
									<Text style={stylesMake.label}>Costo: </Text>
									<Text style={stylesMake.value}>$ {service.costo}</Text>
								</View>
								<View style={stylesMake.row}>
									<Text style={stylesMake.label}>Turnos: </Text>
									{service.duracionTurno === 30 ? (
										<Text style={stylesMake.value}>De {service.duracionTurno} minutos</Text>
									) : 
										<Text style={stylesMake.value}>De {service.duracionTurno} hora</Text>
									}
								</View>
								<View style={stylesMake.row}>
									<Text style={stylesMake.label}>Abierto desde las: </Text>
									<Text style={stylesMake.value}>{service.horaInicio} horas</Text>
								</View>
								<View style={stylesMake.row}>
									<Text style={stylesMake.label}>Cierra a las: </Text>
									<Text style={stylesMake.value}>{service.horaFin} horas</Text>
								</View>
								<View style={stylesMake.row}>
									<Text style={stylesMake.label}>Dias: </Text>
									<Text style={stylesMake.value}>{service.diasDefinidosSemana}</Text>
								</View>
							</View>
						) : <View style={stylesMake.span}>
								<Text style={{fontWeight:'bold'}}>Esta empresa aún no publicó un Servicio.</Text>
							</View>
						}
					</View>
				</View>
			) : null}

			{isCalendarVisible ? (
				<View>
					<View>
						<Text style={stylesMake.title}>Seleccione un dia:</Text>
					</View>
					
					<View>
						{service !== null ? (
							<View style={stylesMake.body}>

								{isLoading ? (
									<ActivityIndicator size="large" color="#0000ff" />
								) : (
									<View>
										<CalendarPicker 
											compId={compId} 
											userLogin={user} 
											service={service} 
											setInforVisible={setInforVisible}
											setCalendarVisible={setCalendarVisible}
											setSchedulesVisible={setSchedulesVisible}
											setSelectedDate = {setSelectedDate}
											setAvailableTimes = {setAvailableTimes}
											setTimePickerVisible = {setTimePickerVisible}
											/>
									</View>
								)}
				
							</View>
						) : null}
					</View>
				</View>
			) : null}

			{isSchedulesVisible ? (
				<View>
					<ScheduleList 
						compId={compId} 
						userLogin={user} 
						service={service} 
						selectedDate={selectedDate}
						isLoadingSchedules={isLoadingSchedules}
						availableTimes={availableTimes}
						onRefresh={onRefresh}
					/>
				</View>
			) : null}

		</ScrollView>
	);
};

const stylesMake = StyleSheet.create({
	container: {
		flex: 1,
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

	body: {
		margin: 1,
		backgroundColor:'#e3e0ef',
	},

	row: {
		width: '100%',
        flexDirection: 'row',
        // justifyContent: 'space-between', // Distribuir en dos columnas
        alignItems: 'center', // Alinear verticalmente al centro
        paddingHorizontal: 10, // Espacio horizontal
		paddingVertical: 2, // Espacio horizontal
        // borderBottomWidth:1,
        // borderBottomColor: '#fff'
    },
    column: {
        flex: 1, // Ocupar espacio igual en ambas columnas
        paddingHorizontal: 5, // Espacio horizontal entre columnas
    },
    space: {
        width: 20
    },
	label: {
        fontWeight:'bold',
    },
    value: {
        fontWeight:'normal',
    },
	span: {
		flex: 1,
		fontSize: 15,
        fontWeight:'bold',
		padding: 20,
		alignItems:'center',
    },
});

const CalendarPicker = ( params ) => {

	// console.log(LocaleConfig);
	const [list, setList] = useState(null);
	
	const { 
		setInforVisible, 
		setCalendarVisible,
		setSchedulesVisible,
		setSelectedDate,
		setAvailableTimes,
		setTimePickerVisible,
	} = params;

    var id_server = params.service.id;

    const markedDates = {};
    const disabledDates = {};

	LocaleConfig.locales['es']  = {
		monthNames: [
			'Enero',
			'Febrero',
			'Marzo',
			'Abril',
			'Mayo',
			'Junio',
			'Julio',
			'Agosto',
			'Septiembre',
			'Octubre',
			'Noviembre',
			'Diciembre',
		],
		monthNamesShort: [
		  	'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul.', 'Ago', 'Set', 'Oct', 'Nov', 'Dic',
		],
		dayNames: [
			'Domingo',
			'Lunes',
			'Martes',
			'Miercoles',
			'Jueves',
			'Viernes',
			'Sábado',
		],
		dayNamesShort: ['Dom', 'Lun', 'Mar', 'Xer', 'Jue', 'Vie', 'Sab'],
		today: 'Hoja',
	};


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
            console.log('schedulesReturn: ', schedulesReturn.resultado);        

            if (schedulesReturn !== null) {
                setAvailableTimes(schedulesReturn.resultado);    
            } else {
                setAvailableTimes([]);
            }

            setSelectedDate(day.dateString);
            setTimePickerVisible(true);

			setInforVisible(false);
			setCalendarVisible(false);
			setSchedulesVisible(true);
        })
        .catch(error => {
            alert(error); 
        });

    };

	return ( 
        <View>
            <Calendar
                style={stylesPicker.calendar}
                theme={{
                    backgroundColor: '#ffffff',
                    calendarBackground: '#ffffff',
                    textSectionTitleColor: '#b6c1cd',
                    selectedDayBackgroundColor: '#00adf5',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#00adf5',
                    dayTextColor: '#000000',
                    textDisabledColor: '#d9e1e8',
                    dotColor: '#00adf5',
                    selectedDotColor: '#ffffff',
                    arrowColor: 'green',
                    monthTextColor: 'black',
                    indicatorColor: 'black',
                }}
                // disableTouchEvent={false}
                markedDates = {markedDates}
                onDayPress={(day) => handleDateSelect(day)}
                markingType="multi-dot"
                disabledDates={disabledDates}
				// customHeader={({ date, onMonthChange }) => (
				// 	<CalendarHeader month={date} onMonthChange={onMonthChange} />
				// )}
            />
        </View>
	);
};

const stylesPicker = StyleSheet.create({
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
		alignContent: 'space-between',
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
		alignSelf:'flex-end',
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

const ScheduleList = ( params ) => {

	const { 
		compId, 
		userLogin,
		service,
		selectedDate,
		isLoadingSchedules,
		availableTimes,
		onRefresh
	} = params;


	console.log(availableTimes);

	const [selectedHour, setSelectedHour] = useState(null);
	const [showModal, setShowModal] = useState(false);

    const createReservation = (item) => {
		// console.log(item);
		// setSelectedItem(item);
		setSelectedHour(item.fechaHora);
		setShowModal(true);

		setTimeout(() => {
			setShowModal(false);
			onRefresh();
		}, 10000);
	};

	const confirmReservation = (hour) => {
		console.log(hour);

		const formData = {
			idCliente:userLogin.guid,
			idServicio:service.id,
			fechaHoraTurno:hour,
			estado: '',
		};

		BookingController.handleCreateBooking(formData)
		.then(userReturn => {
			// console.log('userReturn: ', userReturn);
			if (userReturn) {
				alert('Se realizó la Reserva con éxito');
				onRefresh();
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

	return (
		<View>
			{isLoadingSchedules ? (
				<ActivityIndicator size="large" color="#0000ff" />
			) : (
				<View style={stylesPicker.container}>
					{availableTimes !== null && availableTimes.length > 0 ? (
						<>
							<View>
								<Text style={stylesPicker.title}>Horarios para el dia {formatDate(selectedDate)}</Text>
			
								<ScrollView>
									{availableTimes.map((item, index) => (
										<View key={index}>
			
											<TouchableOpacity onPress={() => createReservation(item)}>
												<View style={stylesPicker.scheduleItem}>
													<Text style={stylesPicker.hourItem}>Agendate para las {formatDate2(item.fechaHora)}</Text>
													<Text style={[stylesPicker.statusItem, { color: item.disponible ? 'green' : 'red' }]}>
														{item.disponible ? 'Libre' : 'Ocupado'}
													</Text>
												</View>
											</TouchableOpacity>
			
										</View>
									))}
								</ScrollView>
							</View>
						</>
					) : null }
		
					<Modal
						animationType="slide"
						visible={showModal}
						transparent={true}
						>
						<View style={stylesPicker.modal}>
							<TouchableOpacity
								style={stylesPicker.closeModal}
								onPress={() => setShowModal(false)}
							>
								<Text style={stylesPicker.cross}>X</Text>
							</TouchableOpacity>
							<View>
								<Text style={stylesPicker.textConfirm}>
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

const stylesSchedules = StyleSheet.create({
	container: {
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

const CalendarHeader = ({ month, onMonthChange }) => {
	return (
		<View>
			<View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
				<Text>{month}</Text>
			</View>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
				<Text style={{ marginHorizontal: 16 }}>Lun</Text>
				<Text style={{ marginHorizontal: 16 }}>Mar</Text>
				<Text style={{ marginHorizontal: 16 }}>Mie</Text>
				<Text style={{ marginHorizontal: 16 }}>Jue</Text>
				<Text style={{ marginHorizontal: 16 }}>Vie</Text>
				<Text style={{ marginHorizontal: 16 }}>Sab</Text>
			</View>
		</View>
	);
};

export default MakeReservation;