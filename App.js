import { UserContext } from './src/services/context/context'; 
import { 
	StyleSheet, 
	Dimensions,
} from 'react-native';

import React, { 
	useState, useEffect 
} from 'react';

import SQLiteHandler from './src/services/database/SQLiteHandler';
import BaseError from './src/views/utils/BaseError'
import Main from './src/views/home/Main';

import 'react-native-gesture-handler';
 
const App = (config) => {
	try {
		var preferences = {
			'current_user' : {
				'guid':'none',
				'name':'none',
				'last':'none',
				'user':'none',
				'pass':'none',
				'type':'none',
				'mail':'none', 
				'docu':'none',
				'celu':'none',
				'logo':'none', 
			},
			'connection' : {
				'string':'none',
			},
			'theme' : {
				'dark': 0,
				'white': 1,
			}
		}

		const [userPreferences, setUserPreferences] = useState(preferences);
		const [dbLoad, setDbLoad] = useState(true);
		const [isConnected, setIsConnected] = useState(true)

		useEffect(() => {
			SQLiteHandler.createDb('agendate')
			.then(result => {
				setDbLoad(true);
				// console.log('DB Create... ', result);

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
				// console.log('DB Error... ', error);
			});

			const checkConnection = () => {
				// Implementa tu lógica para verificar la conexión aquí
				// Puedes usar librerías como NetInfo o Navigator para esto
				// Actualiza isConnected en consecuencia
				// setIsConnected();
			};
			checkConnection();
	
		}, []); 
	
		if (isConnected) {
			return (
				<UserContext.Provider value={{ userPreferences, setUserPreferences }}>
					<Main style={styles.background} />
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
