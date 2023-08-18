import React, { useState, useEffect } from 'react';
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

import { Picker } from '@react-native-picker/picker';

import * as ImagePicker from "expo-image-picker";

import UsersController from '../../controllers/UsersController';

const RegisterView = () => {

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [nombre, setNombre] = useState('');
	const [apellido, setApellido] = useState('');

	const [email, setEmail] = useState('');
	const [isValidEmail, setIsValidEmail] = useState(true);
	const validateEmail = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const handleEmailChange = (text) => {
		setEmail(text);
		setIsValidEmail(validateEmail(text));
	};

	const [userType, setUserType] = useState('Cliente');

	// customer
	const [foto, setFoto] = useState('');
	const [documento, setDocumento] = useState('');

	// company
	const [rut, setRut] = useState('');
	const [phType, setPhType] = useState('RUT');

	const [razon, setRazon] = useState('');
	const [rubro, setRubro] = useState('');
	const [address, setAddress] = useState('');
	const [logo, setLogo] = useState('');
	const [description, setDescription] = useState('');

	// images
	const [selectedPicture, setSelectedPicture] = useState(null);
	const [selectedLogo, setSelectedLogo] = useState(null);


	let openImagePickerAsync = async (buttonIndex) => {

		let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
		// console.log(permissionResult.granted);
		if (permissionResult.granted === false) {
			alert('Se requiere permisos de acceso a la camara.');
			return;
		}

		const pickerResult = await ImagePicker.launchImageLibraryAsync()
	
		// eslint-disable-next-line
		if (!pickerResult.canceled) {
	
			const newSelectedImage = pickerResult.assets[0].uri;
			console.log(newSelectedImage);

			if (buttonIndex === 0) {
				setSelectedPicture(newSelectedImage);
			} 
			if (buttonIndex === 1) {
				setSelectedLogo(newSelectedImage);
			}
		}
	}


	useEffect(() => {
		setSelectedPicture(null);
		setSelectedLogo(null);
	}, [userType]);

	const handleImagePicker = (buttonIndex) => {
		openImagePickerAsync(buttonIndex);
	};

	const sendData = () => {
		const formData = {
			username,
			password,
			nombre,
			apellido,
			email,
			userType,
			selectedPicture,
			selectedLogo,
			documento,
			rut,
			razon,
			rubro,
			address,
			description,
		};

		try {
			UsersController.handleRegister(formData);
		} catch (error) {
			alert(error.message);
		}
	};

	return (
		<View style={styles.container}>

			<View style={styles.header}>

				<View style={styles.inputContainer}>
					<TextInput
						style={styles.input}
						placeholder="Username"
						value={username}
						onChangeText={setUsername}
					/>
				</View>

				<View style={styles.inputContainer}>
					<TextInput
						style={styles.input}
						placeholder="Password"
						secureTextEntry
						value={password}
						onChangeText={setPassword}
					/>
				</View>
			</View>

			<ScrollView style={styles.body}>

				<View style={styles.inputContainer}>
					<TextInput
						style={styles.input}
						placeholder="Nombre"
						value={nombre}
						onChangeText={setNombre}
					/>
				</View>

				<View style={styles.inputContainer}>
					<TextInput
						style={styles.input}
						placeholder="Apellido"
						value={apellido}
						onChangeText={setApellido}
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
						onChangeText={setEmail}
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
						onValueChange={(itemValue) => setUserType(itemValue)}
					>
						<Picker.Item label="Cliente" value="Cliente" />
						<Picker.Item label="Empresa" value="Empresa" />
					</Picker>

				</View>

				{/* Campos según el tipo seleccionado */}
				{userType === 'Cliente' ? (
					<View style={styles.typeContainer}>
						<View style={styles.imageContainer}>
						
							<TouchableOpacity
								onPress={ () => handleImagePicker(0) }
								> 	
								<Image 
									style={styles.image} 
									source={{ uri: selectedPicture }} 
									/>
							</TouchableOpacity>
							
						</View>
						<View style={styles.inputContainer}>
							<TextInput
								keyboardType="numeric"
								style={styles.input}
								placeholder="Documento"
								value={documento}
								onChangeText={setDocumento}
							/>
						</View>
					</View>
				) : (
					<View style={styles.typeContainer}>

						<View style={styles.doctypeContainer}>
							<View style={styles.docpickerContainer}>
								<Picker
									style={styles.pickerType}
									placeholder="TipoDoc"
									selectedValue={phType}
									onValueChange={(itemValue) => setPhType(itemValue)}
								>
									<Picker.Item label="RUT" value="RUT" />
									<Picker.Item label="CI" value="CI" />
								</Picker>
							</View>
							<View style={styles.inputRUTContainer}>
								<TextInput
									keyboardType="numeric"
									style={styles.input}
									placeholder={phType}
									value={rut}
									onChangeText={setRut}
								/>
							</View>
						</View>

						<View style={styles.inputContainer}>
							<TextInput
								style={styles.input}
								placeholder="Razon Social"
								value={documento}
								onChangeText={setRazon}
							/>
						</View>

						<View style={styles.inputContainer}>
							<TextInput
								style={styles.input}
								placeholder="Rubro"
								value={documento}
								onChangeText={setRubro}
							/>
						</View>

						<View style={styles.inputContainer}>
							<TextInput
								style={styles.input}
								placeholder="Dirección"
								value={address}
								onChangeText={setAddress}
							/>
						</View>

						<View style={styles.infoContainer}>
							<View style={styles.logoContainer}>

								<TouchableOpacity
									onPress={ () => handleImagePicker(1) }
									> 
									<Image 
										style={styles.image} 
										source={{ uri: selectedLogo }} 
										/>
								</TouchableOpacity>
							</View>
							<View style={styles.inputDescContainer}>
								<TextInput
									style={styles.inputDescription}
									placeholder="Descripción..."
									value={description}
									onChangeText={setDescription}
									multiline
									numberOfLines={4}
								/>
							</View>
						</View>

					</View>
				)}
				{/* */}
			</ScrollView>

			<View style={styles.footer}>
				{/* Button */}
				<View style={styles.nextContainer}>
					<Button
						title="Enviar"
						onPress={sendData}
						color="lightgreen"
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
		marginTop: 10,
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
		borderColor: 'lightgreen',
		borderWidth: 1,
		borderRadius: 30,
		marginRight: 25,
		marginLeft: 25,
		marginBottom: 20,
		paddingHorizontal: 15,
		paddingVertical: 3,
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
		borderColor: 'lightgreen',
		borderWidth: 1,
		borderRadius: 30,
		marginRight: 25,
		marginLeft: 25,
		marginBottom: 20,
		marginTop: 13,
		height: 37,
	},
	picker: {
		flex: 1,
		color: 'gray',
		fontWeight: 'bold',
		height: 1,
	},


	typeContainer: {
		alignItems: 'flex-start',
		borderColor: 'lightgreen',
		borderWidth: 1,
		borderRadius: 30,
		marginRight: 25,
		marginLeft: 25,
		marginBottom: 20,
		marginTop: 13,
	},

	imageContainer: {
		height: 75,
		width: 90,
		borderColor: 'lightgreen',
		margin: 25,
		alignSelf: 'center',
		borderRadius: 20,
		backgroundColor: 'lightgreen',
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
		borderColor: 'lightgreen',
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
		borderColor: 'lightgreen',
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
		borderColor: 'lightgreen',
		marginStart: 25,
		borderRadius: 20,
		backgroundColor: 'lightgreen',
		alignContent: 'center',
	},
	inputDescContainer: {
		backgroundColor: 'transparent',
		borderColor: 'lightgreen',
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
	nextContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		margin: 20,
	},
	nextText: {
		color: 'darkgray',
		fontSize: 12,
		marginRight: 4,
	},
});

export default RegisterView;