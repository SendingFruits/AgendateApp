import React, { useState } from 'react';

import { 
	View, 
	Text, 
	StyleSheet,
	TouchableOpacity 
} from 'react-native';

import { 
	NavigationContainer 
} from '@react-navigation/native';

import { 
	createDrawerNavigator ,
	DrawerContentScrollView
} from '@react-navigation/drawer';

import 'react-native-gesture-handler';

import { 
	faHome, faUser, faStar
} from '@fortawesome/free-solid-svg-icons';

import { 
	FontAwesomeIcon 
} from '@fortawesome/react-native-fontawesome';


import HomeView from './HomeView';
import AboutView from './AboutView';
import MenuButtonItem from './MenuButtonItem';

import LoginView from '../users/LoginView';

const drawerAside = createDrawerNavigator();

const AsideMenu = () => {
	return (
		<NavigationContainer style={styles.barMenu}>
			<drawerAside.Navigator 
				initialRouteName="Home"
				drawerContent = { (props) => <MenuItems { ...props} />}
			>
				<drawerAside.Screen name="Inicio" component={HomeView} />
				{/* <drawerAside.Screen name="Reservas" component={BookingsView} />
				<drawerAside.Screen name="Reservas" component={BookingsView} /> */}
				<drawerAside.Screen name="Acerca de..." component={AboutView} />
				<drawerAside.Screen name="Login" component={LoginView} />
			</drawerAside.Navigator>
		</NavigationContainer>
	);
};

const MenuItems = ({navigation}) => {
	return (
		
		<DrawerContentScrollView
			style={styles.asideMenu}
		>
			{/* Header */}
			<View style={styles.header}>
				<Text style={styles.title}>Menú</Text>
			</View>

			{/* Body */}
			<View style={styles.body}>
				<MenuButtonItem 
					icon = {faHome}
					text = "Inicio"
					onPress = { () => navigation.navigate('Inicio')}
				/>

				<MenuButtonItem 
					icon = {faStar}
					text = "Acerca de... "
					onPress = { () => navigation.navigate('Acerca de...')}
				/>
			</View>

			{/* Footer */}
			<View style={styles.footer}>
				<TouchableOpacity 
					style={styles.btnLogin}
					onPress = { () => navigation.navigate('Login')}
					>
					{/* <Image 
						source = {{uri:'../resources/images/user_login_2.png'}}
						style = {styles.image}
					/> */}
					<FontAwesomeIcon icon={faUser} />
					<Text style={styles.textLogin}>Iniciar Sesión</Text>
				</TouchableOpacity>
			</View>
		</DrawerContentScrollView>
	)
}

const styles = StyleSheet.create({
	barMenu: {
		backgroundColor: 'linear-gradient(45deg, #135054, #238162, #2FA568, #DDDDD0, #F2F2F2, #FFFFFF)'
	},
	asideMenu: {
		padding: 15,
		backgroundColor: 'linear-gradient(45deg, #135054, #238162, #2FA568, #DDDDD0, #F2F2F2, #FFFFFF)'
	},
	header: {
		height: 30,
	},
	body: {
		flex: 1,
	},
	footer: {
		
		borderTopWidth: 1,
		borderTopColor: 'gray',
		paddingVertical: 10,
	},
	title:{
		fontSize: 20,
		fontWeight: 'bold',
	},
	btnLogin:{
		padding: 10,
		marginTop: 3,
		marginBottom: 15,
		backgroundColor: '#e9e9e9',
		borderRadius: 10,
		alignItems: 'center',
		flexDirection: 'row'
	},
	textLogin: {
		marginStart: 7,
		fontWeight: 'bold'
	},
});

export default AsideMenu;