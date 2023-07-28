import React, { useState } from 'react';

import { 
	StyleSheet
} from 'react-native';

import MenuAside from './src/views/home/MenuAside';

let userPreferences = {
	'current_user' : {
		'user':'none',
		'pass':'none',
		'type':'none',
		'pick':'none',
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
};
 
const App = (config) => {
	return (
		<MenuAside 
			style={styles.background}
			userPreferences = {userPreferences}
		/>
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