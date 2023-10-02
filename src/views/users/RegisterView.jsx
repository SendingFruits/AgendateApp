import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

import * as ImagePicker from "expo-image-picker";

import UsersController from '../../controllers/UsersController';

import {
	Text,
	StyleSheet,
	View,
	ScrollView,
	TextInput,
	Image,
	Button,
	TouchableOpacity,
	Platform,
	Alert
} from 'react-native';


const RegisterView = () => {

	const navigation = useNavigation();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');

	const [movil, setMovil] = useState('');
	const [email, setEmail] = useState('');
	const [isValidEmail, setIsValidEmail] = useState(true);
	const validateEmail = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		// alert('El correo es incorrecto!');
		return emailRegex.test(email);
	};

	const handleTextInputChange = (text) => {
		// Validar según el tipo de teclado (keyboardType)
		if (/^[a-zA-Z]*$/.test(text)) {
		  // Solo letras
		  setInputValue(text);
		} else if (/^[0-9]*$/.test(text)) {
		  // Solo números
		  setInputValue(text);
		} else {
		  // Otros caracteres (no se permite)
		  alert('Solo se permiten letras o números.');
		}
	};

	const [userType, setUserType] = useState('customer');
	const [document, setDocument] = useState('');

	const handleFieldChange = (text,field) => {

		// console.log('text: ', text);
		// console.log('field: ', field);

		switch (field) {
			case 'username':
				setUsername(text);
				break;
			case 'password':
				setPassword(text);
				break;
			case 'firstName':
				setFirstName(text);
				break;
			case 'lastName':
				setLastName(text);
				break;
			case 'movil':
				setMovil(text);
				break;
			case 'email':
				setEmail(text);
				setIsValidEmail(validateEmail(text));	
				break;
			case 'userType':
				setUserType(text);
				break;
			case 'document':
				setDocument(text);
				break;

			default:
				break;
		}
	};
	
	useEffect(() => {
        // Comentar para test
        setUsername('');
        setPassword('');
		setFirstName('');
		setLastName('');
		setMovil('');
		setEmail('');
		setDocument('');
		setIsValidEmail(true);
		setUserType('customer');
    }, []);

	const sendData = () => {
		console.log('sendData');

		const formData = {
			username,
			password,
			firstName,
			lastName,
			movil,
			email,
			userType,
			document,
		};

		UsersController.handleRegister(formData)
		.then(userReturn => {
			console.log('userReturn: ', userReturn);
			if (userReturn) {
				alert('Usuario creado con éxito \n Se le enviará un Correo Electrónico para confirmar su creación.');
				navigation.navigate('Login');

				setUsername('');
				setPassword('');
				setFirstName('');
				setLastName('');
				setMovil('');
				setEmail('');
				setDocument('');
				setIsValidEmail(true);
				setUserType('customer');
			}
		})
		.catch(error => {
			alert(error);
		});
	};

	return (
		<View style={styles.container}>

			<View style={styles.header}>

				<View style={styles.inputContainer}>
					<TextInput
						// keyboardType="text"
						style={styles.input}
						placeholder="Username"
						value={username}
						// onChangeText={setUsername}
						onChangeText={(text) => handleFieldChange(text, 'username')}
					/>
				</View>

				<View style={styles.inputContainer}>
					<TextInput
						// keyboardType="text"
						style={styles.input}
						placeholder="Password"
						secureTextEntry
						value={password}
						// onChangeText={setPassword}
						onChangeText={(text) => handleFieldChange(text, 'password')}
					/>
				</View>
			</View>

			<ScrollView style={styles.body}>

				<View style={styles.inputContainer}>
					<TextInput
						style={styles.input}
						placeholder="Nombre"
						value={firstName}
						// onChangeText={setFirstName}
						onChangeText={(text) => handleFieldChange(text, 'firstName')}
					/>
				</View>

				<View style={styles.inputContainer}>
					<TextInput
						style={styles.input}
						placeholder="Apellido"
						value={lastName}
						// onChangeText={setLastName}
						onChangeText={(text) => handleFieldChange(text, 'lastName')}
					/>
				</View>

				<View style={styles.inputContainer}>
					<TextInput
						keyboardType="numeric"
						style={styles.input}
						placeholder="Telefono"
						value={movil}
						// onChangeText={setMovil}
						onChangeText={(text) => handleFieldChange(text, 'movil')}
					/>
				</View>

				<View style={[styles.inputContainer, 
					!isValidEmail && styles.invalidInput]}
					>
					<TextInput
						keyboardType="email-address"
						style={styles.input}
						placeholder="Correo"
						value={email}
						// onChangeText={setEmail}
						onChangeText={(text) => handleFieldChange(text, 'email')}
						autoCapitalize="none"
					/>
					{
						!isValidEmail && 
						<Text style={styles.errorText}>
							Correo electrónico inválido
						</Text>
					}
				</View>

				{/* Type */}
				<View style={styles.pickerContainer}>
					<Picker
						style={styles.picker}
						placeholder="Tipo"
						selectedValue={userType}
						// onValueChange={(itemValue) => setUserType(itemValue)}
						onValueChange={(itemValue) => handleFieldChange(itemValue, 'userType')}
					>
						<Picker.Item label="Cliente" value="customer" />
						<Picker.Item label="Empresa" value="company" />
					</Picker>

				</View>

				{/* Campos según el tipo seleccionado */}
				{userType === 'customer' ? (
					<View>
						<View style={styles.inputContainer}>
							<TextInput
								keyboardType="numeric"
								maxLength={8}
								style={styles.input}
								placeholder="Documento"
								value={document}
								// onChangeText={setDocument}
								onChangeText={(text) => handleFieldChange(text, 'document')}
							/>
						</View>
					</View>
				) : (
					<View>
						<View>
							<View style={styles.inputContainer}>
								<TextInput
									keyboardType="numeric"
									maxLength={12}
									style={styles.input}
									placeholder={"RUT"}
									value={document}
									// onChangeText={setDocument}
									onChangeText={(text) => handleFieldChange(text, 'document')}
								/>
							</View>
						</View>
					</View>
				)}
				{/* */}
			</ScrollView>

			<View style={styles.footer}>
				{/* Button */}
				<View style={styles.sendContainer}>
					<Button
						title="Enviar"
						onPress={sendData}
						color="#2ECC71"
					/>
				</View>
			</View>

		</View>
	);
};

const styles = StyleSheet.create({

	container: {
		flex: 1,
		backgroundColor: 'transparent',
		marginTop: 20,
	},

	header: {
		marginTop: 10,
	},
	body: {
		marginTop: 3,
	},
	footer: {
		position: 'relative',
		alignItems: 'center',
		top: 3,
		bottom: 5,
		left: 5,
		right: 5,
	},


	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'transparent',
		borderColor: '#2ECC71',
		borderWidth: 1,
		borderRadius: 30,
		marginRight: 25,
		marginLeft: 25,
		marginBottom: 15,
		paddingHorizontal: 15,
		paddingVertical: 10,
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
	
	errorText: {
		color: 'red',
		fontSize: 12,
		marginTop: 5,
	},


	pickerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		borderColor: '#2ECC71',
		borderWidth: 1,
		borderRadius: 30,
		marginRight: 25,
		marginLeft: 25,
		marginBottom: 20,
		marginTop: 2,
		height: 50,
	},
	picker: {
		flex: 1,
		color: 'gray',
		fontWeight: 'bold',
		height: 1,
	},


	typeContainer: {
		alignItems: 'flex-start',
		borderColor: '#2ECC71',
		borderWidth: 1,
		borderRadius: 30,
		marginRight: 25,
		marginLeft: 25,
		marginBottom: 20,
		marginTop: 1,
	},

	imageContainer: {
		height: 75,
		width: 90,
		borderColor: '#2ECC71',
		margin: 25,
		alignSelf: 'center',
		borderRadius: 20,
		backgroundColor: '#2ECC71',
		alignItems: 'center', // Centrar horizontalmente
		justifyContent: 'center', // Centrar verticalmente
	},
	image: {
		flex: 1,
		height: 75,
		width: 90,
		borderRadius: 20,
	},
	imgButton: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	imgText: {
		color: 'white',
	},


	doctypeContainer: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'space-between',
		marginTop: 15,
	},
	docpickerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		borderColor: '#2ECC71',
		borderWidth: 1,
		borderRadius: 30,
		marginLeft: 25,
		marginRight: 10,
		marginBottom: 15,
		height: 35,
		width: 115,
		paddingHorizontal: 1,
	},
	pickerType: {
		flex: 1,
		color: 'gray',
		fontWeight: 'bold',
		height: 1,
		width: 100,
	},
	inputRUTContainer: {
		backgroundColor: 'transparent',
		borderColor: '#2ECC71',
		borderWidth: 1,
		borderRadius: 30,
		height: 35,
		width: 165,
		paddingVertical: 3,
		paddingHorizontal: 15,
	},


	infoContainer: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'space-between',
	},
	logoContainer: {
		height: 75,
		width: 90,
		borderColor: '#2ECC71',
		marginStart: 25,
		borderRadius: 20,
		backgroundColor: '#2ECC71',
		alignContent: 'center',
	},
	inputDescContainer: {
		backgroundColor: 'transparent',
		borderColor: '#2ECC71',
		borderWidth: 1,
		borderRadius: 30,
		marginRight: 25,
		marginLeft: 8,
		marginBottom: 20,
		paddingHorizontal: 12,
		paddingVertical: 3,
	},
	inputDescription: {
		color: 'black',
		fontWeight: 'bold',
		width: 165,
	},
	logo: {
		flex: 1,
		height: 75,
		width: 90,
		borderRadius: 20,
	},

	button: {
		backgroundColor: 'lightblue',
		padding: 15,
		borderRadius: 5,
		marginTop: 20,
	},
	sendContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		margin: 50,
	},
	sendText: {
		color: 'darkgray',
		fontSize: 12,
		marginRight: 4,
	},
});

export default RegisterView;