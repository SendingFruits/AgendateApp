import { UserContext } from './src/services/context/context'; 
import { 
	StyleSheet, 
	Dimensions,
	Text,
	View
} from 'react-native';

import React, { 
	useState, useEffect 
} from 'react';

import SQLiteHandler from './src/services/database/SQLiteHandler';
import BaseError from './src/views/utils/BaseError'
import Main from './src/views/home/Main';

import 'react-native-gesture-handler';


// init App
const App = (config) => {
	try {
		var preferences = {
			'current_user' : {
				'guid':'none', // 1
				'name':'none', // John
				'last':'none', // Doe
				'user':'none', // admin
				'pass':'none', // 123456
				'type':'none', // customer
				'mail':'none', // john@example.com
				'docu':'none', // 47659893
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

		var getOrientation = () => {
			const { width, height } = Dimensions.get('window');
			return width > height ? 'landscape' : 'portrait';
		}

		const [dbLoad, setDbLoad] = useState(true);
		const [isConnected, setIsConnected] = useState(true)
		const [orientation, setOrientation] = useState(getOrientation());

		useEffect(() => {
			SQLiteHandler.createDb('agendate')
			.then(result => {
				setDbLoad(true);
				console.log('DB Create... ', result);

				// SQLiteHandler.generateTestData()
				// .then(() => {
				// 	console.log('Generate data ok... ');
				// })
				// .catch(error => {
				// 	console.log('Generate data Error... ', error);
				// });

				// SQLiteHandler.updateDatos('Servicios', 4, {
				// 	'DiasDefinidosSemana':'Lunes;Martes;Miercoles;Jueves;Viernes;'
				// })
				// .then(() => {
				// 	console.log('Update data ok... ');
				// })
				// .catch(error => {
				// 	console.log('Update data Error... ', error);
				// });
			})
			.catch(error => {
				setDbLoad(false);
				console.log('DB Error... ', error);
			});

			const checkConnection = () => {
				// Implementa tu lógica para verificar la conexión aquí
				// Puedes usar librerías como NetInfo o Navigator para esto
				// Actualiza isConnected en consecuencia
				// setIsConnected();
			};
			checkConnection();
	
			const handleOrientationChange = () => {
				const newOrientation = getOrientation();
				setOrientation(newOrientation);
			};
			Dimensions.addEventListener('change', handleOrientationChange);
		}, []); 
	

		if (isConnected) {
			return (
				<UserContext.Provider value={{ userPreferences, setUserPreferences }}>
					<Main style={styles.background} orientation={orientation} />
				</UserContext.Provider>
			);
		} else {
			return (
				<BaseError errorType={'debug'} />
			);
		}
	} catch (error) {
		console.log(error);
		return (
			// <UserContext.Provider value={{ userPreferences, setUserPreferences }}>
			// 	<Main style={styles.background} orientation={orientation} />
			// </UserContext.Provider>
			<BaseError errorType={error} />
		);
	}
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
