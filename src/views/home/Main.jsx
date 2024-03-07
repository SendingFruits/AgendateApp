import { 
	AuthProvider 
} from '../../context/AuthContext';

import HomeView from './HomeView';
import Menu from './Menu';

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
import Testing from '../utils/Testing';

import React, { 
	useEffect, useState 
} from 'react';

import { Keyboard } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import { LinearGradient } from 'expo-linear-gradient';

const Drawer = createDrawerNavigator();
 
const Main = ( params ) => {

	var {
		isLogin,
		setIsLogin,
		isConnected,
		setIsConnected,
	} = params;

	const [currentUser, setCurrentUser] = useState({});

	var menuParams = {
		isLogin:isLogin,
		setIsLogin:setIsLogin,
		main:params,
		currentUser:currentUser,
		setCurrentUser:setCurrentUser
	}

	var homeParams = {
		isConnected:isConnected,
		setIsConnected:setIsConnected,
	}

	useEffect(() => {
		// setCurrentUser(current_User);
	}, []);

	return (
		<AuthProvider>	
			<NavigationContainer
				onStateChange={(state) => {
					if ((state.history.length > 1)) {
						for (const key in state.history) {
							if (state.history[key].type == 'drawer') {
								Keyboard.dismiss();
								// setMenuVisible(true);
							} 
						}
					} else {
						// setMenuVisible(false);
						// setProfileVisibleInit(false);
					}
				}} > 
				<Drawer.Navigator
					options={{ title: null, headerShown: false, }}
					initialRouteName="Inicio"
					drawerContent = { 
						(props) => <Menu { ...props} params={menuParams} /> 
					} >
					
					<Drawer.Screen 
						options={{
							title: null,
							headerBackground: () =>
								<LinearGradient 
									colors={['#135000', '#238162', '#dfe4ff']} 
									style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />, 
						}}
						name="Inicio" 
						initialParams={homeParams} 
						component={HomeView}
						/>
					<Drawer.Screen 
						options={{
							title: null,
							headerBackground: () =>
								<LinearGradient 
									colors={['#135000', '#238162', '#dfe4ff']} 
									style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />, 
						}}
						name="Reservas"
						// initialParams={ homeParams } 
						component={BookingsView} 
						/>
					<Drawer.Screen 
						options={{
							title: null,
							headerBackground: () =>
								<LinearGradient 
									colors={['#135000', '#238162', '#dfe4ff']} 
									style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />, 
						}}
						name="Servicios" 
						// initialParams={ homeParams } 
						component={ServicesView} 
						/>
					<Drawer.Screen 
						options={{
							title: null,
							headerBackground: () =>
								<LinearGradient 
									colors={['#135000', '#238162', '#dfe4ff']} 
									style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />, 
						}}
						name="Favoritos" 
						// initialParams={ homeParams } 
						component={FavoritesView} 
						/>
					<Drawer.Screen 
						options={{
							title: null,
							headerBackground: () =>
								<LinearGradient 
									colors={['#135000', '#238162', '#dfe4ff']} 
									style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />, 
						}}
						name="Crear Servicio" 
						// initialParams={ homeParams } 
						component={ServiceCreate} 
						/>
					<Drawer.Screen 
						options={{
							title: null,
							headerBackground: () =>
								<LinearGradient 
									colors={['#135000', '#238162', '#dfe4ff']} 
									style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />, 
						}}
						name="Promociones" 
						// initialParams={ homeParams } 
						component={PromosView} 
						/>
					<Drawer.Screen 
						options={{
							title: null,
							headerBackground: () =>
								<LinearGradient 
									colors={['#135000', '#238162', '#dfe4ff']} 
									style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />, 
						}}
						name="Realizar Reserva" 
						// initialParams={ homeParams } 
						component={MakeReservation} 
						/>
					<Drawer.Screen 
						options={{
							title: null,
							headerBackground: () =>
								<LinearGradient 
									colors={['#135000', '#238162', '#dfe4ff']} 
									style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />, 
						}}
						name="Horarios" 
						// initialParams={ homeParams } 
						component={ScheduleList} 
						/>
					<Drawer.Screen 
						options={{
							title: null,
							headerBackground: () =>
								<LinearGradient 
									colors={['#135000', '#238162', '#dfe4ff']} 
									style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />, 
						}}
						name="Password" 
						// initialParams={ homeParams } 
						component={PassChanger} 
						/>
					<Drawer.Screen 
						options={{
							title: null,
							headerBackground: () =>
								<LinearGradient 
									colors={['#135000', '#238162', '#dfe4ff']} 
									style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />, 
						}}
						name="Perfil de Usuario" 
						// initialParams={ homeParams } 
						component={ProfileView} 
						/>
					<Drawer.Screen 
						options={{
							title: null,
							headerBackground: () =>
								<LinearGradient 
									colors={['#135000', '#238162', '#dfe4ff']} 
									style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />, 
						}}
						name="testing" 
						// initialParams={ homeParams } 
						component={Testing} 
						/>
		
					<Drawer.Screen 
						options={{
							title: null,
							headerBackground: () =>
								<LinearGradient 
									colors={['#fff','#fff']} 
									style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />, 
						}}
						name="Login" 
						// initialParams={ menuParams } 
						component={LoginView} 
						/>
					<Drawer.Screen 
						options={{
							title: null,
							headerBackground: () =>
								<LinearGradient 
									colors={['#efefef','#efefef']} 
									style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />, 
						}}
						name="Registro de Usuario" 
						// initialParams={ homeParams } 
						component={RegisterView} 
						/>
			
				</Drawer.Navigator>
			</NavigationContainer>
		</AuthProvider>
	);
};
 
export default Main;

