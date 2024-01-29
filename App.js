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
 
const { width, height } = Dimensions.get('window');

const checkConnection = (param) => {
	if (param) {
		return true
	} else {
		return false
	}
}; 

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
		const [isConnected, setIsConnected] = useState(false);

		const setLocalDB = () => {
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
		}
		
		useEffect(() => {
			// setIsConnected(true);
		}, []); 
	
		if (isConnected) {
			return (
				<UserContext.Provider value={{ userPreferences, setUserPreferences }}>
					<Main 
						isConnected={isConnected}
						setIsConnected={setIsConnected}
						// mainStyle={JSON.stringify(styles.main)}
					/>
				</UserContext.Provider>
			);
		} else {
			return (
				<BaseError 
					errorType={'api'} 
					setIsConnected={setIsConnected}
					/>
			);
		}
	} catch (error) {
		console.log(error);
		return (
			<BaseError 
				errorType={error}
				setIsConnected={setIsConnected}
				/>
		);
	}
};

export default App;

// puedo agregar un estilo aca y usarlo en toda la aplicacion
const styles = StyleSheet.create({
	main: {
		flex: 1,
		// backgroundColor: '#'
	},
});
