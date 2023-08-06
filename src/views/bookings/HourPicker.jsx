import React, { useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const HourPicker = () => {
	const [isTimePickerVisible, setTimePickerVisible] = useState(false);
	const [selectedTime, setSelectedTime] = useState(null);

	const showTimePicker = () => {
		setTimePickerVisible(true);
	};

	const hideTimePicker = () => {
		setTimePickerVisible(false);
	};

	const handleConfirm = (time) => {
		setSelectedTime(time);
		hideTimePicker();
	};

	return (
		<View style={styles.container}>
			<Button title="Mostrar Selector de Hora" onPress={showTimePicker} />
			{selectedTime && (
				<Text>Hora seleccionada: {selectedTime.toLocaleTimeString()}</Text>
			)}
			<DateTimePickerModal
				isVisible={isTimePickerVisible}
				mode="time"
				onConfirm={handleConfirm}
				onCancel={hideTimePicker}
				headerTextIOS="Elige una Hora"
				confirmTextIOS="Confirmar"
				cancelTextIOS="Cancelar"
				is24Hour
				timePickerContainerStyleIOS={styles.timePickerContainer}
				titleStyle={styles.title}
				cancelTextStyle={styles.cancelText}
				confirmTextStyle={styles.confirmText}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	timePickerContainer: {
		backgroundColor: 'white',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		color: 'black',
	},
	cancelText: {
		color: 'red',
	},
	confirmText: {
		color: 'green',
	},
});

export default HourPicker;