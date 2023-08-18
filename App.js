import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import Main from './src/views/home/Main';
import { UserContext } from './src/services/context/context'; 

const App = (config) => {

	var preferences = {
		'current_user' : {
			'name':'none',
			'user':'none',
			'pass':'none',
			'type':'none',
			'pick':'uri/: ...',
			'data': {
				'company' : {
					'rut': '',
					'logo': 'uri/: ...',
					'businessName': '',
					'area': '',
					'address': '',
					'description': '',
					'location': {
						'lng':'',
						'lat':''
					},
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
		}
	}

	const [userPreferences, setUserPreferences] = useState(preferences);

	return (
		<UserContext.Provider value={{ userPreferences, setUserPreferences }}>
            <Main style={styles.background} />
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