import { UserContext } from '../../services/context/context'; 

import HomeView from './HomeView';
import MenuButtonItem from './MenuButtonItem';

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
	useRef, useContext, useEffect, useState 
} from 'react';

import { 
	Dimensions,
	StyleSheet,
	View, 
	Text, 
	TouchableOpacity,
	Keyboard,
} from 'react-native';

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import testing from '../utils/testing';

import { 
	faHome, 
	faUser, 
	faStar, 
	faRegistered,
	faCalendar,
	faScrewdriverWrench,
	faTags,
	faPowerOff
} from '@fortawesome/free-solid-svg-icons';

import { 
	FontAwesomeIcon 
} from '@fortawesome/react-native-fontawesome';

import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const Drawer = createDrawerNavigator();
 
const Main = ( params ) => {

	const mapRef = useRef(null);

	var {
		setOptions,
		isConnected,
		setIsConnected,
		profileVisibleInit
	} = params;

	const { userPreferences, setUserPreferences } = useContext(UserContext);
	// console.log('userPreferences: ', userPreferences);
	var userLogin = userPreferences.current_user;
	const [calloutVisible, setCalloutVisible] = useState(false);

	const handleSearch = (query) => {
		console.log(query);
		const regex = new RegExp(`\\b${query.toLowerCase()}\\b`); 
		const foundCompany = companies.find(company => regex.test(company.title.toLowerCase()));
		// const foundCompany = companies.find(company => company.title.toLowerCase().includes(query.toLowerCase()));
	
		if (foundCompany) {
			const newRegion = {
				latitude: foundCompany.location.latitude,
				longitude: foundCompany.location.longitude,
				latitudeDelta: 0.00006,
				longitudeDelta: 0.00006,
			};
			// Centra el mapa en la ubicación de la empresa encontrada
			mapRef.current.animateToRegion(newRegion); 
			Keyboard.dismiss();
		}
	};

	return (
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

							{/* <View style={styles.search}>
								<SearchPanel 
									onSearch={handleSearch} 
									mapRef={mapRef} 
									width={width}
									height={height}
									/>
							</View> */}

								
						</LinearGradient>, 
				}}
				name="Inicio" 
				initialParams={{
					setOptions,
					isConnected,
					setIsConnected
				}} 
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
				options={{}}
				name="testing" 
				component={testing} 
				/>

		</Drawer.Navigator>
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
						color = {null}
						onPress = { () => navigation.navigate('Inicio')}
					/>

					{(userLogin.type !== 'none') ? (
						<View>
							{ (userLogin.type === 'company') ? (
								<View>
									<MenuButtonItem 
										icon = {faCalendar}
										text = "Agenda"
										color = {null}
										onPress = { () => navigation.navigate('Agenda')}
									/>
									<MenuButtonItem 
										icon = {faScrewdriverWrench}
										text = "Servicios"
										color = {null}
										onPress = { () => navigation.navigate('Servicios', params={userLogin})}
									/>
									<MenuButtonItem 
										icon = {faTags}
										text = "Promociones"
										color = {null}
										onPress = { () => navigation.navigate('Promociones', params={userLogin})}
									/>
								</View>
							) : null }

							{ (userLogin.type === 'customer') ? (
								<>
									<MenuButtonItem 
										icon = {faCalendar}
										text = "Reservas"
										color = {null}
										onPress = { () => navigation.navigate('Reservas')}
										/>
									<MenuButtonItem 
										icon = {faStar}
										text = "Favoritos"
										color = {null}
										onPress = { () => navigation.navigate('Favoritos')}
										/>
								</>
							) : null }
						</View>
					) : null }
				</View>
				{/* Footer */}
				<View style={styles.footer}>
					<>
						{userLogin.user === 'none' ? (
							<View>
								<View>
									<MenuButtonItem 
										icon = {faUser}
										text = {'Iniciar Sesión'}
										color = {null}
										onPress = { () => navigation.navigate('Login')}
									/>
								</View>

								<View>
									<MenuButtonItem 
										icon = {faRegistered}
										text = {'Registrarse'}
										color = {null}
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
										color = {null}
										// onPress={ () => setProfileVisible(!profileVisible)}
										onPress={ () => navigation.navigate('Perfil de Usuario', userLogin)}
									/>
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
					</>				
					<>
						{
							userLogin.user === 'admin' ? (
								<TouchableOpacity onPress={() => navigation.navigate('testing')} >
									<Text>pantalla de testing</Text>
								</TouchableOpacity>
							) : ( null )
						}
					</>


				</View>
				
			</DrawerContentScrollView>

			{userLogin.user !== 'none' ? (	
				<View style={styles.btnLogoutContainer}>
					<TouchableOpacity 
						style={styles.btnLogout} 
						onPress={() => logout()} >
						<FontAwesomeIcon icon={faPowerOff} size={22} />
						<Text style={{ fontWeight:'bold' }}>Cerrar Sesión</Text>
					</TouchableOpacity>
				</View>
			) : null }

			{/* <LinearGradient
				colors={['#2ECC71', '#D0E4D0', '#dfe4ff']}
				start={{ x: 1, y: 1 }} // Punto de inicio en la esquina superior izquierda
				end={{ x: 0, y: 0 }} // Punto final en la esquina inferior derecha
				style={styles.btnLogoutContainer}
				> */}
				{/* <TouchableOpacity 
					style={styles.btnLogout} 
					onPress={() => logout()} >
					<FontAwesomeIcon icon={faPowerOff} size={35}/>
				</TouchableOpacity> */}
			{/* </LinearGradient> */}
			
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
	},

	btnLogoutContainer: {
		flex: 0.1,
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:'#',
		opacity: 50,
		marginHorizontal: 30,
		marginVertical: 30,
		borderRadius: 30,
		// borderWidth: 0.8,
		
	},
	btnLogout:{
		flexDirection:'column',
		justifyContent:'center',
		alignItems:'center',
		fontSize: 25
	},


});

export default Main;

