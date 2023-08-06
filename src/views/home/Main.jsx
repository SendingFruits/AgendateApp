import React, { useState } from 'react';
import { 
	View, 
	Text, 
	StyleSheet,
	TouchableOpacity,
	Image
} from 'react-native';
import { 
	NavigationContainer 
} from '@react-navigation/native';
import { 
	createDrawerNavigator,
	DrawerContentScrollView
} from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import { 
	faHome, 
	faUser, 
	faStar, 
	faDoorOpen, 
	faRegistered,
	faCalendar
} from '@fortawesome/free-solid-svg-icons';
import { 
	FontAwesomeIcon 
} from '@fortawesome/react-native-fontawesome';

import HomeView from './HomeView';
import MenuButtonItem from './MenuButtonItem';

import DiaryView from '../bookings/DiaryView';
import BookingsView from '../bookings/BookingsView';
import MakeReservation from '../bookings/MakeReservation';
import AboutView from './AboutView';

import LoginView from '../users/LoginView';
import RegisterView from '../users/RegisterView';
import ProfileView from '../users/ProfileView';

const drawerAside = createDrawerNavigator();

// let userLogin = {};

const Main = (
	params
) => {
	var userLogin = params.userPreferences.current_user;
	
	return (
		<NavigationContainer style={styles.barMenu}>
			<drawerAside.Navigator 
				initialRouteName="Home"
				drawerContent = { 
					(props) => <MenuItems { ...props} userLogin={userLogin} />
				}
			>
				<drawerAside.Screen name="Inicio" component={HomeView} />
				<drawerAside.Screen name="Agenda" component={DiaryView} />
				<drawerAside.Screen name="Reservas" component={BookingsView} />
				<drawerAside.Screen name="Realizar Reserva" component={MakeReservation} />
				{/* <drawerAside.Screen name="Acerca de..." component={AboutView} /> */}
				
				<drawerAside.Screen name="Login" component={LoginView} />
				<drawerAside.Screen name="Registro de Usuario" component={RegisterView} />
			</drawerAside.Navigator>
		</NavigationContainer>
	);
};

const MenuItems = (
	{
		navigation,
		userLogin
	}
) => {
	// console.log(userLogin);
	const profile = () => {
		console.log('profile');
	};

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

				{(userLogin.type === 'none') ? (
					<View>
						<MenuButtonItem 
							icon = {faCalendar}
							text = "Agenda"
							onPress = { () => navigation.navigate('Agenda')}
						/>
						
						<MenuButtonItem 
							icon = {faDoorOpen}
							text = "Reservas"
							onPress = { () => navigation.navigate('Reservas')}
						/>
					</View>
				) : (
					<View>
						
					</View>
				)}
				

				{/* <MenuButtonItem 
					icon = {faStar}
					text = "Acerca de... "
					onPress = { () => navigation.navigate('Acerca de...')}
				/> */}
				
				{/* <MenuButtonItem 
					icon = {faDoorOpen}
					text = "Servicios"
					onPress = { () => navigation.navigate('Servicios')}
				/> */}
			</View>

			{/* Footer */}
			<View style={styles.footer}>

				{userLogin.user === 'none' ? (
					<View>
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

						<TouchableOpacity 
							style={styles.btnLogin}
							onPress = { () => navigation.navigate('Registro de Usuario')}
							>
							{/* <Image 
								source = {{uri:'../resources/images/user_login_2.png'}}
								style = {styles.image}
							/> */}
							<FontAwesomeIcon icon={faRegistered} />
							<Text style={styles.textLogin}>Registrarse</Text>
						</TouchableOpacity>
					</View>
				) : (
					<View>
						<TouchableOpacity 
							style={styles.btnLogin}
							onPress={profile}
							>
							{/* <Image 
								source = {{uri:'../resources/images/user_login_2.png'}}
								style = {styles.image}
							/> */}
							<FontAwesomeIcon icon={faUser} />
							<Text style={styles.textLogin}>
								{userLogin.user}
							</Text>
						</TouchableOpacity>
					</View>
				)}

			</View>
		</DrawerContentScrollView>
	)
}

const styles = StyleSheet.create({
	barMenu: {
		backgroundColor: '#2ECC71'
	},
	asideMenu: {
		padding: 15,
		backgroundColor: '#2ECC71'
	},
	header: {
		height: 30,
		marginBottom: 25,
	},
	body: {
		flex: 1,
	},
	footer: {
		marginTop: 25,
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
		backgroundColor: '#a8ffe5',
		borderRadius: 10,
		alignItems: 'center',
		flexDirection: 'row'
	},
	textLogin: {
		marginStart: 7,
		fontWeight: 'bold'
	},
	pickImage: {
		width: 5,
		height: 5,
	}
});

export default Main;