import { UserContext } from './src/services/context/context'; 
import { StyleSheet, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import Main from './src/views/home/Main';

const App = (config) => {

	var getOrientation = () => {
		const { width, height } = Dimensions.get('window');
		return width > height ? 'landscape' : 'portrait';
	}
	const [orientation, setOrientation] = useState(getOrientation());

	useEffect(() => {
		const handleOrientationChange = () => {
			const newOrientation = getOrientation();
			setOrientation(newOrientation);
		};
		Dimensions.addEventListener('change', handleOrientationChange);
	}, []);

	var preferences = {
		'current_user' : {
			'guid':'none',
			'name':'none',
			'last':'none',
			'user':'none',
			'pass':'none',
			'type':'none',
			'mail':'none',
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
					'document': '47326453',
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
				orientation={orientation}
				/>
        </UserContext.Provider>
	);
};

export default App;

var windowWidth = Dimensions.get('window').width;
var windowHeight = Dimensions.get('window').height;

// puedo agregar un estilo aca y usarlo en toda la aplicacion
const styles = StyleSheet.create({
	background: {
		flex: 1,
		backgroundColor: '#69ACDD'
	},
});