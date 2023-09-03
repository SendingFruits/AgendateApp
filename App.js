import { UserContext } from './src/services/context/context'; 
import { StyleSheet, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import Orientation from 'react-native-orientation';
import Main from './src/views/home/Main';

const App = (config) => {

	// var windowWidth = Dimensions.get('window').width;
	// var windowHeight = Dimensions.get('window').height;

	const [orientation, setOrientation] = useState('unknown');
	console.log(Orientation.getSpecificOrientation);
	// useEffect(() => {
		
	// }, []);

	var preferences = {
		'current_user' : {
			'guid':'2',
			'name':'Esteban',
			'last':'Piccardo',
			'user':'esteban',
			'pass':'12345',
			'type':'company',
			'mail':'esteban@gmail.com',
			'data': {
				'company' : {
					'rut': '10000500123456789',
					'socialReason': 'Panaderia y Rotiseria',
					'address': 'Vilardebo 4565',
					'itemCompany': 'Gastronomia',
					'description': 'Panaderia y Rotiseria donde podes realizar tu reserva de pedido y venir a retirar...',
					'location': {
						'lng':-34.87843487086523,
						'lat':-56.17987247183919
					},
					'service': {
						'nombre':'none',
						'starts':'--/--/-- 00:00:00',
						'ends':'--/--/-- 00:00:00',
						'frecuency': 1,
					},
					'logo': 'uri/: ...',
				},
				'customer' : {
					'document': '',
					'picture': 'uri/: ...'
				},
			}
		},
		'connection' : {
			'string':'none',
		},
		'theme' : {
			'appColor': '#2ECC71',
			'asideColor':'#69ACDD',
			'backgroundColor':'#69ACDD',
			'menuButttons': '#a8ffe5'
		},
		'dimensions':{
			// 'windowWidth':windowWidth,
			// 'windowHeight':windowHeight,
		}
	}

	const [userPreferences, setUserPreferences] = useState(preferences);

	return (
		<UserContext.Provider value={{ userPreferences, setUserPreferences }}>
            <Main 
				style={styles.background} 
				// windowWidth={windowWidth}
				// windowHeight={windowHeight}
				/>
        </UserContext.Provider>
	);
};

export default App;

// puedo agregar un estilo aca y usarlo en toda la aplicacion
const styles = StyleSheet.create({
	background: {
		flex: 1,
		backgroundColor: '#69ACDD'
	},
});