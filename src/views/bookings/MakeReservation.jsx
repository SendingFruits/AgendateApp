import React, { 
	useState, useEffect 
} from 'react';

import { Calendar } from 'react-native-calendars';

import { 
	View, 
	StyleSheet, 
	Text, 
	ScrollView, 
	ActivityIndicator 
} from 'react-native';
 
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import ServicesController from '../../controllers/ServicesController';
import ServiceItem from '../services/ServiceItem';
import CalendarPicker from './CalendarPicker';

const MakeReservation = ({ route, navigation }) => {
	
	var item = route.params.item;
	console.log('item: ', item);

	// var guid = params.route.params.guid; 

	// const [company, setCompany] = useState(null);
	const [service, setService] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [list, setList] = useState(null);

	const getService = async () => {
        ServicesController.getServicesForCompany(guid)
        .then(serviceReturn => {
            
            if (serviceReturn.value !== null) {
                setList([serviceReturn.value]);
            } else {
                setList([]);
            }
        })
        .catch(error => {
            alert('ERROR al intentar cargar los Servicios, ' + error);
        });
    }

	useEffect(() => {
		ServicesController.getServicesForCompany(item.id)
		.then(serviceReturn => {
			console.log('serviceReturn: ', serviceReturn);
			// serviceReturn.calendar = true;
			setService(serviceReturn);
			setIsLoading(false);
		})
		.catch(error => {
			setIsLoading(false);
			alert(error); 
		});	
	}, [item.id]);

	return ( 
		<ScrollView style={styles.container}>
			
			<View style={styles.header}>
				<Text style={styles.title}>{item.title}</Text>

				<View style={styles.row}>
					{/* <Text style={styles.label}>Descripción:</Text> */}
					<Text style={styles.value}>{item.description}</Text>
					{/* <Text style={styles.value}>{item.description}{"\n"}{service.descripcion}</Text> */}
				</View>
				<View style={styles.row}>
					<Text style={styles.label}>Rubro: </Text>
					<Text style={styles.value}>{item.itemCompany}</Text>
				</View>
				<View style={styles.row}>
					<Text style={styles.label}>Dirección: </Text>
					<Text style={styles.value}>{item.address}</Text>
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
									<CalendarPicker idService={service.id}/>
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