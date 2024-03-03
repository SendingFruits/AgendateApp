import { UserContext } from '../../services/context/context'; 
import { useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import UsersController from '../../controllers/UsersController';
import MenuButtonItem from '../home/MenuButtonItem';
import AlertModal from '../utils/AlertModal';

import React, { 
	useState, useEffect, useContext 
} from 'react';

import { 
	StyleSheet,
	View, 
	Text, 
	TextInput, 
	Image, 
	TouchableOpacity
} from 'react-native';
import { 
	faUser, 
	faLock
} from '@fortawesome/free-solid-svg-icons';
import { 
	FontAwesomeIcon 
} from '@fortawesome/react-native-fontawesome';

import AsyncStorage from '@react-native-async-storage/async-storage';


const Drawer = createDrawerNavigator();

const LoginView = () => {

	const navigation = useNavigation();
	const { setUserPreferences } = useContext(UserContext);

    const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        setUsername('');
        setPassword('');
    }, []);


	const saveId = async (token,id) => {
		try {
			// await AsyncStorage.clear();
			await AsyncStorage.setItem('userLoginId', id.toString());
			// await AsyncStorage.setItem('token', token.toString());
			// await AsyncStorage.getItem('token');
		} catch (error) {
			console.error('Error al limpiar AsyncStorage:', error);
		}
    }

	const login = () => {
		UsersController.handleLogin(username, password)
		.then(userReturn => {
			if (userReturn != null) {
				var user = JSON.parse(userReturn);

				saveId('user.token',user.id);
				
				setUserPreferences({
					current_user: {
						guid: user.id,
						name: user.nombre,
						last: user.apellido,
						user: user.nombreUsuario,
						pass: user.contrasenia,
						celu: user.celular,
						mail: user.correo,
						type: user.tipoUsuario,
						docu: user.tipoUsuario === 'company' ? user.rutDocumento : user.documento,
						...(user.tipoUsuario === 'company' && {
							rut: user.rutDocumento,
							businessName: user.razonSocial,
							owner: user.nombrePropietario,
							category: user.rubro,
							address: user.direccion,
							city: user.ciudad,
							description: user.descripcion,
							latitude: user.latitude,
							longitude: user.longitude,
							logo: user.logo,
						}),
					},
				});

				navigation.navigate('Inicio');
				// alert('Bienvenido '+ (userReturn.firstname !== undefined ? userReturn.firstname : user.nombre ));
				var text = 'Bienvenido '+ (userReturn.firstname !== undefined ? userReturn.firstname : user.nombre );
				AlertModal.showAlert('Autenticación',text);
			}
		})
		.catch(error => {
			AlertModal.showAlert('Autenticación',error);
		});

	};
   const handleCoogleSing=()=>{
	
   }
	return (
		<View style={styles.container}>
			<View style={styles.body}>
				<Image source={require('../../../assets/Eicon.png')} style={styles.avatar} />

				<Text style={styles.title}>Bienvenido</Text>

				<View style={styles.inputContainer}>
					{/* <Image source={require('../../resources/images/user_login_1.png')} style={styles.inputIcon} /> */}
					<FontAwesomeIcon icon={faUser} style={styles.icon} />
					<TextInput
						style={styles.input}
						value={username}
						onChangeText={setUsername}
						placeholder="Usuario"
					/>
				</View>

				<View style={styles.inputContainer}>
					{/* <Image source={require('../../resources/images/pass_login_1.png')} style={styles.inputIcon} /> */}
					<FontAwesomeIcon icon={faLock} style={styles.icon} />
					<TextInput
						style={styles.input}
						value={password}
						onChangeText={setPassword}
						placeholder="Contraseña"
						secureTextEntry
					/>
				</View>

				<View style={styles.checkboxContainer}>
					{/* <CheckBox value={rememberMe} onValueChange={setRememberMe} /> */}
					{/* <Text style={styles.checkboxText}>Recordar mi usuario</Text> */}
					{/* <Text style={styles.forgotPasswordText}>¿Olvidaste la contraseña?</Text> */}
				</View>

				<MenuButtonItem 
					icon = {null}
					text = "Iniciar Sesión"
					// color = {['#dfe4ff', '#238162', '#2ECC71']}
					color = {['#135f44', '#2ECC71', '#dfe4ff']}
					onPress = { () => login() }
					/>

				<View style={styles.registerContainer}>
					<Text>¿Sos nuevo?</Text>
					<View style={{ flexDirection:'row' }}>
						<Text>Registrate </Text>
						<TouchableOpacity
							onPress = { () => navigation.navigate('Registro de Usuario')} >
							<Text style={{ color:"#135f44" }}>Aquí</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View>
  	);
};

const styles = StyleSheet.create({
	icon: {
		flex: 1,
		color: 'black',
		fon: 3,
		marginRight: 5,
	},
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	header: {
		height: 220,
		backgroundColor: '#135054',
	},
	body: {
		flex: 1,
		alignItems: 'center',
		paddingVertical: 20,
	},
	avatar: {
		width: 60,
		height: 60,
		borderRadius: 30,
		marginBottom: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'transparent',
		borderColor: '#135054',
		borderWidth: 1,
		borderRadius: 30,
		marginRight: 18,
		marginLeft: 18,
		marginBottom: 10,
	  	paddingHorizontal: 15,
		paddingVertical:2,
	},
	inputIcon: {
		width: 40,
		height: 40,
		marginRight: 5,
	},
	input: {
		flex: 1,
		color: 'black',
		fontWeight: 'bold',
	},
	checkboxContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: 10,
	},
	checkboxText: {
		color: 'darkgray',
		fontSize: 12,
		marginLeft: 5,
	},
	forgotPasswordText: {
		color: '#135054',
		fontWeight: 'bold',
		marginLeft: 'auto',
		fontSize: 12,
	},
	registerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 60,
	},
	registerText: {
		color: 'darkgray',
		fontSize: 12,
		marginRight: 4,
	},
});

export default LoginView;