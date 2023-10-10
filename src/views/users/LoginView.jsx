import { UserContext } from '../../services/context/context'; 
import { useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import UsersController from '../../controllers/UsersController';

import React, { 
	useState,
	useEffect, 
	useContext 
} from 'react';

import { 
	StyleSheet,
	View, 
	Text, 
	TextInput, 
	Image, 
	Button, 
	TouchableOpacity
} from 'react-native';
import { 
	faUser, 
	faLock
} from '@fortawesome/free-solid-svg-icons';
import { 
	FontAwesomeIcon 
} from '@fortawesome/react-native-fontawesome';


const Drawer = createDrawerNavigator();

const LoginView = () => {

	const navigation = useNavigation();
	const { setUserPreferences } = useContext(UserContext);

    const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        // Comentar para test, aca se le da el valor inicial al estado o cualquier variable
        setUsername('');
        setPassword('');
    }, []);

	const login = () => {
		UsersController.handleLogin(username, password)
		.then(userReturn => {
			if (userReturn != null) {
				// console.log('userReturn: ', userReturn);
				var user = JSON.parse(userReturn);
				// console.log('user: ', user);
				
				setUserPreferences({
					current_user: {
						guid: user.id,
						name: user.nombre,
						last: user.apellido,
						user: user.nombreUsuario,
						pass: user.contrasenia,
						mail: user.correo,
						type: user.tipoUsuario,
						docu: user.documento,
						// data: userReturn.data,
					},   
				});

				navigation.navigate('Inicio');
				alert('Bienvenido '+ 
					(userReturn.firstname !== undefined ? 
						userReturn.firstname : user.nombre ));
			}
		})
		.catch(error => {
			alert(error);
		});

	};

	return (
		<View style={styles.container}>
			<View style={styles.body}>
				<Image source={require('../../resources/images/user_login_2.png')} style={styles.avatar} />

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

				<Button 
					title="Iniciar Sesión" 
					onPress={login}
					color='#69ACDD' 
					/>

				<View style={styles.registerContainer}>
					<Text style={styles.registerText}>¿Sos nuevo?</Text>
					<Button 
						title="Registrate" 
						onPress = { () => navigation.navigate('Registro de Usuario')} 
						color="#2ECC71"
						/>
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
		backgroundColor: '#2ECC71',
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
		borderColor: '#2ECC71',
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
		color: '#2ECC71',
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