import React from 'react';

import { 
	StyleSheet,
	Text, 
	TouchableOpacity,
	View,
} from 'react-native';

import { 
	FontAwesomeIcon 
} from '@fortawesome/react-native-fontawesome';

import { LinearGradient } from 'expo-linear-gradient';


const MenuButtonItem = ({ icon, text, onPress }) => {
	return (	
		<LinearGradient
			colors={['#135054', '#d8ffff', '#d0e9e1']}
			start={{ x: 0.02, y: 0.50 }}
      		end={{ x: 1.55, y: 1.55 }}
			style={styles.btnAside}
			>
			<TouchableOpacity onPress={onPress} >
				<View style={styles.container}>
					{icon && <FontAwesomeIcon icon={icon} style={styles.icon} />}
					
					{/* <Text style = {styles.text}>{text}</Text> */}
					<Text style={[styles.text, icon ? null : { textAlign: 'center' }]}>{text}</Text>
				</View>
			</TouchableOpacity>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	btnAside: {
		paddingVertical: 10,
		paddingHorizontal: 6,
		marginBottom: 15,
		borderRadius: 10,
		borderColor: '#000',
		borderWidth: 0.2,
		borderRadius: 15
	},
	container: {
		flexDirection: 'row', // Alinea los elementos en una fila
		alignItems: 'center', // Alinea los elementos verticalmente al centro
	},
	image: {
		height: 35,
		width: 35,
		borderRadius: 23,
	},
	text: {
		fontWeight: 'bold',
		marginLeft: 5,
	},
	icon: {
		color: 'black',
	}
});

export default MenuButtonItem;