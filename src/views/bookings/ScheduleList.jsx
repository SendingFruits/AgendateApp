import { formatDate } from '../utils/Functions'

import React, { 
	useState 
} from 'react';

import { 
	View, 
	Button, 
	StyleSheet, 
	Text, 
	ScrollView, 
	TouchableOpacity, 
	Modal 
} from 'react-native';


const ScheduleList = ({ availableTimes, selectedDate }) => {

	console.log('availableTimes: ', availableTimes);
	console.log('selectedDate: ', selectedDate);

	var filteredTimes = [];
	if (availableTimes !== null) {
		filteredTimes = availableTimes.filter(horario => horario.fechaHora === selectedDate);
	}
	console.log('filteredTimes: ', selectedDate);

	const [colorSchedule, setColorSchedule] = useState('green');
	const [selectedItem, setSelectedItem] = useState(null);
	const [selectedHour, setSelectedHour] = useState(null);
	const [showModal, setShowModal] = useState(false);

	// var list = (availableTimes) => {
	//     for (const key in availableTimes) {
	// 		console.log(availableTimes[key]);
	// 	}
	// };

	const confirmReservation = (item) => {
		console.log(item);
		setSelectedItem(item);
		setSelectedHour(item.hour);
		setShowModal(true);
	};

	const createReservation = (item) => {
		console.log(item);

	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Horarios para el dia {formatDate(selectedDate)}</Text>
	
			<ScrollView>
				
						<Text>asd</Text>
					
						<Text>asd</Text>
				
				
			</ScrollView>

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
							Agendate para el dia {"\n"} {formatDate(selectedDate)} a las {selectedHour}
						</Text>
						<Button
							title="Confirmar"
							onPress={() => {
								createReservation(item);
								setShowModal(false);
							}} />
					</View>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#e3e0ef',
	},
	title: {
		alignSelf: 'center',
		marginTop: 3,
		padding: 2,
		color: '#000000',
		fontWeight: 'bold',
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

export default ScheduleList;