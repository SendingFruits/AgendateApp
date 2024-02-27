import { 
    AuthContext 
} from '../../context/AuthContext';

import { formatDate, formatDate2 } from '../utils/Functions'

import AlertModal from '../utils/AlertModal';
import BookingController from '../../controllers/BookingController';
import SchedulesController from '../../controllers/SchedulesController';

import React, { 
	useContext, useState, useEffect
} from 'react';

import { 
	View, 
	Button, 
	StyleSheet, 
	Text, 
	ScrollView, 
	TouchableOpacity, 
	Modal,
	ActivityIndicator
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

const ScheduleList = ( params ) => {

	/*
		Metodo para pantalla separada
	 */
		// const { navigation } = params;
		// var paramsJSON = JSON.parse(params.route.params);
		// const { day, idServer } = paramsJSON;
	/*
		Metodo para componente dinamico
	 */
		var paramsJSON = JSON.parse(params.params);
		const { day, idServer } = paramsJSON;
	/*
	 */


	const { currentUser } = useContext(AuthContext);

	const [selectedDate, setSelectedDate] = useState(null);
	const [selectedHour, setSelectedHour] = useState(null);
	const [availableTimes, setAvailableTimes] = useState(null);

	const [showModal, setShowModal] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [dataCompany, setDataCompany] = useState({});
	const [dataService, setDataService] = useState({});


    const getCompanyData = async () => {
        var selectedcompany = await AsyncStorage.getItem('dataCompany');
        if (selectedcompany !== null) {
            var companyJSON = JSON.parse(selectedcompany);
            if (companyJSON !== null) {
                setCompanyData(companyJSON);
            }
        }
    }

    const getServiceId = async () => {
        var selectedService = await AsyncStorage.getItem('selectedService');
        if (selectedService !== null) {
            var serviceJSON = JSON.parse(selectedService);
            if (serviceJSON !== null) {
                setServerSelectId(serviceJSON.id);
            }
        }
    }

    const createReservation = (item) => {
		// console.log(item);
		// setSelectedItem(item);
		setSelectedHour(item.fechaHora);
		setShowModal(true);

		setTimeout(() => {
			setShowModal(false);
			setIsLoading(true);
			setTimeout(() => {
				setIsLoading(false);
			}, 3000);
		}, 10000);
	};

	const confirmReservation = async (hour) => {
		// console.log(hour);

		const formData = {
			idCliente:currentUser.guid,
			idServicio:service.id,
			fechaHoraTurno:hour,
			estado: '',
		};


		try {
			
		} catch (error) {
			
		}

		BookingController.handleCreateBooking(formData)
		.then(userReturn => {
			// console.log('userReturn: ', userReturn);
			if (userReturn) {
				// alert('Se realizó la Reserva con éxito');
				AlertModal.showAlert('Envio Exitoso ', 'Se realizó la Reserva.');
				setIsLoading(true);
				setTimeout(() => {
					setIsLoading(false);
				}, 3000);
			}
		})
		.catch(error => {
			alert(error);
		});
	};

	const scheduleList = () => {
        SchedulesController.getSchedulesForService(idServer,day)
        .then(schedulesReturn => {
            console.log('schedulesReturn: ', schedulesReturn.resultado);        

            if (schedulesReturn !== null) {
                setAvailableTimes(schedulesReturn.resultado);    
            } else {
                setAvailableTimes([]);
            }

            setSelectedDate(day);
        })
        .catch(error => {
            console.log(error);
			AlertModal.showAlert('Horarios ', JSON.stringify(error));
        });
    };


	useEffect(() => {
		scheduleList();
	}, [idServer,day,isLoading]);

	return (
		<>
			{isLoading ? ( <ActivityIndicator size="large" color="#0000ff" /> ) : (
				<>
					{availableTimes !== null && availableTimes.length > 0 ? (
						<>
							<View>
								<Text style={styles.title}>Horarios disponibles para el dia {formatDate(day)}</Text>
			
								<ScrollView horizontal={true} >
									{availableTimes.map((item, index) => (
										<View key={index}>
			
											<TouchableOpacity
												style={{ flexDirection:'column', alignItems:'center' }}
												onPress={() => createReservation(item)}>
												<View style={styles.scheduleItemComp}>
													<Text style={styles.hourItem}>{formatDate2(item.fechaHora)}</Text>
													{/* <Text style={[styles.statusItem, { color: item.disponible ? 'green' : 'red' }]}>
														{item.disponible ? 'Libre' : 'Ocupado'}
													</Text> */}
												</View>
											</TouchableOpacity>
			
										</View>
									))}
								</ScrollView>
							</View>
						</>
					) : (
						<View>
							<Text style={styles.title}>Sin horarios para el dia {formatDate(day)}</Text>
						</View>
					)}

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

					{/*
						Solo para pantalla separada
					 */}
					{/* <LinearGradient 
						colors={['#dfe7ff', '#238162', '#135000' ]} 
						style={{ padding: 10, justifyContent: 'center', alignItems: 'center' }} >
						<TouchableOpacity onPress={() => navigation.navigate('Realizar Reserva')} >
							<Text style={{ fontWeight:'bold', color:'#fff' }}>VOLVER</Text>
						</TouchableOpacity>
					</LinearGradient> */}
				</>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#e3e0ef',
	},
	title: {
		alignSelf:'center',
		marginTop: 3,
		padding: 2,
		color:'#000000',
		fontWeight:'bold',
		// backgroundColor:'#e3eeee',
		width:'100%',
		textAlign:'center'
	},
	scheduleItemList: {
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
	scheduleItemComp: {
		margin: 10,
		padding: 15,
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center',
		borderBottomColor: '#8DA9A4',
		borderWidth: 0.7,
		borderRadius: 20,
	},
	hourItem: {
		textAlign:'center',
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

export default ScheduleList;