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
	console.log('item param: ', item);

	// var guid = params.route.params.guid; 

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
		// ServicesController.getServicesForCompany(item.id)
		// .then(serviceReturn => {
		// 	console.log('serviceReturn: ', serviceReturn);
		// 	serviceReturn.calendar = true;
		// 	setService(serviceReturn);
		// 	setIsLoading(false);
		// })
		// .catch(error => {
		// 	setIsLoading(false);
		// 	alert(error); 
		// });	
	}, []);

	return ( 
		<ScrollView style={styles.container}>
			
			<View style={styles.header}>
				<Text style={styles.title}>{item.title}</Text>
				<Text style={styles.description}>{item.description}</Text>
			</View>

			<View style={styles.body}>

				{isLoading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
					<View>
						{/* <ServiceItem service={service} from={"calendar"} item={null}/> */}
						<CalendarPicker idService={null}/>
					</View>
                )}

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
	},
	description: {
		alignSelf:'center',
		marginLeft: 3,
		marginRight: 3,
		paddingBottom: 1,
		color:'#000000',
	},
	body: {
		margin: 1,
		// backgroundColor: '#ffffff',
		backgroundColor:'#e3e0ef',
	},
});

export default MakeReservation;