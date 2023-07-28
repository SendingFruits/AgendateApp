import React from 'react';

import { 
	View, 
	Text, 
	Image,
	StyleSheet,
	TouchableOpacity 
} from 'react-native';

import { 
	FontAwesomeIcon 
} from '@fortawesome/react-native-fontawesome';


const MenuButtonItem = ({ icon, text, onPress }) => {
	return (	
		<TouchableOpacity 
			style={styles.btnAside}
			onPress={onPress}
			>
			{/* <Image 
				source = {{uri:'../resources/images/user_login_2.png'}}
				style = {styles.image}
			/> */}
			<FontAwesomeIcon icon={icon} style={styles.icon} />
			<Text style = {styles.text}>{text}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	btnAside: {
		padding: 10,
		marginTop: 3,
		marginBottom: 15,
		backgroundColor: '#a8ffe5',
		borderRadius: 10,
		alignItems: 'center',
		flexDirection: 'row'
	},
	image: {
		height: 35,
		width: 35,
		borderRadius: 23,
	},
	text: {
		marginStart: 7,
		fontWeight: 'bold'
	},
	icon: {
		color: 'black',
	}
});

export default MenuButtonItem;