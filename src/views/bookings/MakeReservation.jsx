import React, { useState } from 'react';
import { View, Button, StyleSheet, Text, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

import CalendarPicker from './CalendarPicker';

const MakeReservation = ({ route, navigation }) => {

	var item = route.params.item;

	return ( 
		<View style={styles.container}>
			
			<View style={styles.header}>
				<Text style={styles.title}>{item.title}</Text>
				<Text style={styles.description}>{item.description}</Text>
			</View>

			<View style={styles.body}>
				<CalendarPicker/>
			</View>
		</View>
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
		alignSelf:'flex-start',
		marginLeft: 3,
		marginRight: 3,
		paddingBottom: 1,
		color:'#000000',
	},
	body: {
		margin: 1,
		backgroundColor: '#ffffff',
	},
});

export default MakeReservation;