import { UserContext } from '../../services/context/context'; 

import HomeView from './HomeView';
import MenuButtonItem from './MenuButtonItem';
import BaseError from '../utils/BaseError';

import BookingsView from '../bookings/BookingsView';
import MakeReservation from '../bookings/MakeReservation';
import ScheduleList from '../bookings/ScheduleList';

import ServicesView from '../services/ServicesView';
import PromosView from '../promotions/PromosView';
import FavoritesView from '../favorites/FavoriteView';
import LoginView from '../users/LoginView';
import RegisterView from '../users/RegisterView';
import ProfileView from '../users/ProfileView';
import PassChanger from '../users/PassChanger';
import ServiceCreate from '../services/ServiceCreate';

import React, { 
	useContext, useEffect, useState 
} from 'react';

import { 
	StyleSheet,
	View, 
	Text, 
	TouchableOpacity,
	Keyboard,
} from 'react-native';

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';

import { 
	faHome, 
	faUser, 
	faStar, 
	faDoorOpen, 
	faRegistered,
	faCalendar,
	faRightFromBracket,
	faScrewdriverWrench,
	faTags
} from '@fortawesome/free-solid-svg-icons';

import { 
	FontAwesomeIcon 
} from '@fortawesome/react-native-fontawesome';

import { LinearGradient } from 'expo-linear-gradient';


const Drawer = createDrawerNavigator();

const Main = ( params ) => {

	const { userPreferences, setUserPreferences } = useContext(UserContext);
	var userLogin = userPreferences.current_user;
	
	const [menuVisible, setMenuVisible] = useState(false);
	const [profileVisibleInit, setProfileVisibleInit] = useState(false);

	return (
		<NavigationContainer 
			onStateChange={(state) => {
				if ((state.history.length > 1)) {
					for (const key in state.history) {
						if (state.history[key].type == 'drawer') {
							Keyboard.dismiss();
							setMenuVisible(true);
						} 
					}
				} else {
					setMenuVisible(false);
					setProfileVisibleInit(false);
				}
			}} > 
			<Drawer.Navigator
				options={{ title: null, headerShown: false, }}
				initialRouteName="Inicio"
				drawerContent = { 
					(props) => <MenuItems { ...props} profile={profileVisibleInit} /> 
				} >
				
				<Drawer.Screen 
					options={{
						title: null,
						headerBackground: () =>
							<LinearGradient 
								colors={['#135000', '#238162', '#dfe4ff']} 
								style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
							</LinearGradient>, 
					}}
					name="Inicio" 
					component={HomeView}
					/>

				<Drawer.Screen 
					options={{
						title: null,
						headerBackground: () =>
							<LinearGradient 
								colors={['#135000', '#238162', '#dfe4ff']} 
								style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
							</LinearGradient>, 
					}}
					name={userLogin.type === 'company' ? 'Agenda' : 'Reservas'}
					// name="Reservas" 
					initialParams={ userLogin } 
					component={BookingsView} 
					/>
					
				<Drawer.Screen 
					options={{
						title: null,
						headerBackground: () =>
							<LinearGradient 
								colors={['#135000', '#238162', '#dfe4ff']} 
								style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
							</LinearGradient>, 
					}}
					name="Servicios" 
					initialParams={ userLogin } 
					component={ServicesView} 
					/>

				<Drawer.Screen 
					options={{
						title: null,
						headerBackground: () =>
							<LinearGradient 
								colors={['#135000', '#238162', '#dfe4ff']} 
								style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
							</LinearGradient>, 
					}}
					name="Favoritos" 
					initialParams={ userLogin } 
					component={FavoritesView} 
					/>

				<Drawer.Screen 
					options={{
						title: null,
						headerBackground: () =>
							<LinearGradient 
								colors={['#135000', '#238162', '#dfe4ff']} 
								style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
							</LinearGradient>, 
					}}
					name="Crear Servicio" 
					initialParams={ userLogin } 
					component={ServiceCreate} 
					/>

				<Drawer.Screen 
					options={{
						title: null,
						headerBackground: () =>
							<LinearGradient 
								colors={['#135000', '#238162', '#dfe4ff']} 
								style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
							</LinearGradient>, 
					}}
					name="Promociones" 
					initialParams={ userLogin }
					component={PromosView} 
					/>

				<Drawer.Screen 
					options={{
						title: null,
						headerBackground: () =>
							<LinearGradient 
								colors={['#135000', '#238162', '#dfe4ff']} 
								style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
							</LinearGradient>, 
					}}
					name="Realizar Reserva" 
					// initialParams={{ userLogin: userLogin }} 
					component={MakeReservation} 
					/>

				<Drawer.Screen 
					options={{
						title: null,
						headerBackground: () =>
							<LinearGradient 
								colors={['#135000', '#238162', '#dfe4ff']} 
								style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
							</LinearGradient>, 
					}}
					name="Horarios" 
					component={ScheduleList} 
					/>

				<Drawer.Screen 
					options={{
						title: null, 
					}}
					name="Login" 
					component={LoginView} 
					/>

				<Drawer.Screen 
					options={{
						title: null, 
						headerStyle: {
							backgroundColor: '#efefef'
						},
					}}
					name="Registro de Usuario" 
					component={RegisterView} 
					/>

				<Drawer.Screen 
					options={{
						title: null,
						headerBackground: () =>
							<LinearGradient 
								colors={['#135000', '#238162', '#dfe4ff']} 
								style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
							</LinearGradient>, 
					}}
					name="Password" 
					initialParams={{ userLogin: userLogin }}
					component={PassChanger} 
					/>

				<Drawer.Screen 
					options={{
						title: null,
						headerBackground: () =>
							<LinearGradient 
								colors={['#135000', '#238162', '#dfe4ff']} 
								style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
							</LinearGradient>, 
					}}
					name="Perfil de Usuario" 
					initialParams={{ userLogin: userLogin }}
					component={ProfileView} 
					/>

				<Drawer.Screen 
					options={{
						title: null, 
						headerShown: false 
					}}
					name="BaseError" 
					component={BaseError} 
					/>

			</Drawer.Navigator>
		</NavigationContainer>
	);
};
 
const MenuItems = ( { navigation, profile } ) => {
	
	const { userPreferences, setUserPreferences } = useContext(UserContext);
	var userLogin = userPreferences.current_user;
	const [profileVisible, setProfileVisible] = useState(profile);
	const [islogin, setIsLogin] = useState(false);

	// var stateMenu = navigation.getState();
	// console.log('stateMenu: ', stateMenu.history[1]);
	// if (stateMenu.history[1] === 'undefined') {
	// 	console.log('false');
	// 	setProfileVisible(false);
	// }

	const logout = () => {
		if (userLogin != null) {
			setIsLogin(false);
			setProfileVisible(false);

			setUserPreferences({
                current_user: {
					'guid':'none',
					'name':'none',
					'last':'none',
					'user':'none',
					'pass':'none',
					'type':'none',
					'mail':'none',
					'docu':'none',
					// 'logo':'none',
                },
            });
        }
	};

	useEffect(() => {
		setProfileVisible(profile);

		if (!islogin) {
			navigation.navigate('Inicio');
			// console.log(userPreferences);
		}
	
	}, [userPreferences]);

	return (
		<LinearGradient
			colors={['#2ECC71', '#D0E4D0', '#dfe4ff']}
			start={{ x: 1, y: 1 }} // Punto de inicio en la esquina superior izquierda
			end={{ x: 0, y: 0 }} // Punto final en la esquina inferior derecha
			style={{ flex: 1 }}
			>
			<DrawerContentScrollView>
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

					{(userLogin.type !== 'none') ? (
						<View>
							{ (userLogin.type === 'company') ? (
								<View>
									<MenuButtonItem 
										icon = {faCalendar}
										text = "Agenda"
										onPress = { () => navigation.navigate('Agenda')}
									/>
									<MenuButtonItem 
										icon = {faScrewdriverWrench}
										text = "Servicios"
										onPress = { () => navigation.navigate('Servicios', params={userLogin})}
									/>
									<MenuButtonItem 
										icon = {faTags}
										text = "Promociones"
										onPress = { () => navigation.navigate('Promociones', params={userLogin})}
									/>
								</View>
							) : null }

							{ (userLogin.type === 'customer') ? (
								<>
									<MenuButtonItem 
										icon = {faCalendar}
										text = "Reservas"
										onPress = { () => navigation.navigate('Reservas')}
										/>
									<MenuButtonItem 
										icon = {faStar}
										text = "Favoritos"
										onPress = { () => navigation.navigate('Favoritos')}
										/>
								</>
							) : null }
						</View>
					) : null }
				</View>
				{/* Footer */}
				<View style={styles.footer}>

					{userLogin.user === 'none' ? (
						<View>
							<View>
								<MenuButtonItem 
									icon = {faUser}
									text = {'Iniciar Sesión'}
									onPress = { () => navigation.navigate('Login')}
								/>
							</View>

							<View>
								<MenuButtonItem 
									icon = {faRegistered}
									text = {'Registrarse'}
									onPress = { () => navigation.navigate('Registro de Usuario')}
								/>
							</View>
						</View>
					) : (
						<View>
							<View>
								<MenuButtonItem 
									icon = {faUser}
									text = {userLogin.name}
									// onPress={ () => setProfileVisible(!profileVisible)}
									onPress={ () => navigation.navigate('Perfil de Usuario', userLogin)}
								/>
							</View>

							<View>
								<TouchableOpacity 
									style={styles.btnLogout} 
									onPress={() => logout()} >
									<FontAwesomeIcon icon={faRightFromBracket} />
								</TouchableOpacity>
							</View>
						</View>
					)}
					
					{/* { (profileVisible) ? (
						<View>
							<LinearGradient 
								colors={['#135054', '#238162', '#a8ffe5']} 
							 	style={styles.profile}>
								{ (userLogin.user !== 'none') ? (
									<View>
										<MenuProfileView param={userLogin} />
									</View>
								) : null }
							</LinearGradient>
						</View>
					) : null } */}
				</View>
			</DrawerContentScrollView>
		</LinearGradient>	
	)
}

const styles = StyleSheet.create({
	main: {
		flex: 1,
	},
	touchMenu: {
		flex: 1,
	},
	header: {
		height: 30,
		marginBottom: 25,
		marginHorizontal: 15,
	},
	body: {
		flex: 1,
		marginHorizontal: 15,
	},
	footer: {
		marginTop: 25,
		borderTopWidth: 1,
		borderTopColor: 'gray',
		paddingVertical: 10,
		marginHorizontal: 15,
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
		flexDirection: 'row',
		zIndex: 3,
	},
	btnLogout:{
		position:'absolute',
		bottom:26,
		left:220,
		zIndex: 4,
	},
	textLogin: {
		marginStart: 7,
		fontWeight: 'bold'
	},
	pickImage: {
		width: 5,
		height: 5,
	},
	profile: {
		bottom: 5,
		paddingVertical: 15,
		// backgroundColor:'#a8ffe5',
		borderRadius: 15,
	}
});

export default Main;