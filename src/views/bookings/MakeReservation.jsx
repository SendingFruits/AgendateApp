import { UserContext } from '../../services/context/context'; 

import React, { 
	useState, useEffect, useContext, useRef 
} from 'react';

import { 
	View, 
	RefreshControl,
	StyleSheet, 
	Text, 
	ScrollView, 
	ActivityIndicator,
} from 'react-native';
 
import ServicesController from '../../controllers/ServicesController';
import UsersController from '../../controllers/UsersController';

import CalendarPicker from './CalendarPicker';

import AsyncStorage from '@react-native-async-storage/async-storage';

const MakeReservation = ({ route }) => {
	
	// console.log('route: ', route);
	// const { userPreferences, setUserPreferences } = useContext(UserContext);
	// var userLogin = userPreferences.current_user;
	// console.log('userLogin: ', userLogin);
	
	var user = route.params.userLogin;
	var compId = route.params.item.id; 

	const scrollViewRef = useRef(null);

	const [company, setCompany] = useState(null);
	const [service, setService] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
	

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		getCompany();
		getService();
	}, [compId]);
	
	const getUserId = async () => {
        var id = await AsyncStorage.getItem('userLoginId');
		setUserID(id);
    }

	const saveCompany = async () => {
		// if (item !== null && item !== '') {
		// 	await AsyncStorage.setItem('dataCompany', JSON.stringify(item));
		// }
    }

	const saveServiceStorage = async () => {
		if (service !== null && service !== '') {
			await AsyncStorage.setItem('selectedService', JSON.stringify(service));
		}
    }

	const showServiceStorage = async () => {
		if (compId !== null && compId !== '') {
			const selectedService = await AsyncStorage.getItem('selectedService');
		}
    }


	const getCompany = async () => {
		UsersController.getCompanyData(compId)
		.then(companyReturn => {
			console.log('companyReturn ', companyReturn);
			setCompany(companyReturn);
			console.log('company ', company)
		})
		.catch(error => {
			alert('ERROR al intentar cargar la Empresa, ' + error);
		});
	}

	const getService = async () => {	
		ServicesController.getServicesForCompany(compId)
		.then(serviceReturn => {
			// console.log('serviceReturn ', serviceReturn);
			if (serviceReturn !== null) {
				setService(serviceReturn);
				setIsLoading(false);
				saveServiceStorage();
			} else {
				setService(null);
				setIsLoading(true);
			}
		})
		.catch(error => {
			alert('ERROR al intentar cargar los Servicios, ' + error);
		});
    }


	const handleScrollToElement = () => {
		const scrollToY = 200;
		if (scrollViewRef.current) {
		  	scrollViewRef.current.scrollTo({ y: scrollToY, animated: true });
		}
	};

	useEffect(() => {
		getCompany();
		getService();
	}, [compId]);

	return ( 
		<ScrollView 
			style={styles.container}
			ref={scrollViewRef}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			>

			{console.log('company ', company)}
		
			<View style={styles.header}>
				<Text style={styles.title}>{company.razonSocial}</Text>

				<View style={styles.row}>
					{/* <Text style={styles.label}>Descripción:</Text> */}
					<Text style={styles.value}>{company.descripcion}</Text>
					{/* <Text style={styles.value}>{company.descripcion}{"\n"}{service.descripcion}</Text> */}
				</View>
				<View style={styles.row}>
					<Text style={styles.label}>Rubro: </Text>
					<Text style={styles.value}>{company.rubro}</Text>
				</View>
				<View style={styles.row}>
					<Text style={styles.label}>Dirección: </Text>
					<Text style={styles.value}>{company.direccion}</Text>
				</View>

				<View>
					{service !== null ? (
						<View>
							<View style={styles.row}>
								<Text style={styles.label}>Servicio: </Text>
								<Text style={styles.value}>{service.nombre}{"\n"}{service.descripcion}</Text>
							</View>
							<View style={styles.row}>
								<Text style={styles.label}>Costo: </Text>
								<Text style={styles.value}>$ {service.costo}</Text>
							</View>
							<View style={styles.row}>
								<Text style={styles.label}>Turnos: </Text>
								{service.duracionTurno === 30 ? (
									<Text style={styles.value}>De {service.duracionTurno} minutos</Text>
								) : 
									<Text style={styles.value}>De {service.duracionTurno} hora</Text>
								}
							</View>
							<View style={styles.row}>
								<Text style={styles.label}>Abierto desde las: </Text>
								<Text style={styles.value}>{service.horaInicio} horas</Text>
							</View>
							<View style={styles.row}>
								<Text style={styles.label}>Cierra a las: </Text>
								<Text style={styles.value}>{service.horaFin} horas</Text>
							</View>

							<View style={styles.row}>
								<Text style={styles.label}>Dias: </Text>
								<Text style={styles.value}>{service.diasDefinidosSemana}</Text>
							</View>
						</View>
					) : <View style={styles.span}>
							<Text style={{fontWeight:'bold'}}>Esta empresa aún no publicó un Servicio.</Text>
						</View>
					}
				</View>

				{service !== null ? (
					<View style={{}}>
						<View>
							<Text style={styles.title}>Seleccione un dia:</Text>
						</View>
						<View style={styles.body}>

							{isLoading ? (
								<ActivityIndicator size="large" color="#0000ff" />
							) : (
								<View>
									{/* <ServiceItem service={service} from={"calendar"} item={null}/> */}
									<CalendarPicker 
										companyData={company} 
										userLogin={user} 
										handler={handleScrollToElement}
										/>
								</View>
							)}
			
						</View>
					</View>
				) : null}
			</View>

		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#e3e0ef',
	},
	header: {
		backgroundColor: '#e3e0ef',
		alignContent: 'center',
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

export default MakeReservation;