import React, { useState, useEffect } from 'react';
import { formatDate } from '../utils/Functions'
import { useNavigation } from '@react-navigation/native';

import * as ImagePicker from "expo-image-picker";
import UsersController from '../../controllers/UsersController';

import PassChanger from './PassChanger';

import { 
    Text, 
    StyleSheet, 
    View,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Image 
} from 'react-native';

import { 
	NavigationContainer 
} from '@react-navigation/native';

import { 
	faEye,
    faEyeSlash
} from '@fortawesome/free-solid-svg-icons';
import { 
	FontAwesomeIcon 
} from '@fortawesome/react-native-fontawesome';

const ProfileView = (userLogin) => {

    const navigation = useNavigation();
    
    const [user, setUser] = useState(userLogin.param);

    const [username, setUsername] = useState(user.user);
    const [password, setPassword] = useState(user.pass);

    const [firsname, setFirstname] = useState(user.name);
    const [lastname, setLastname] = useState(user.last);

    const [email, setEmail] = useState(user.mail);

	const [isValidEmail, setIsValidEmail] = useState(true);
	const validateEmail = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const handleEmailChange = (text) => {
		setEmail(text);
		setIsValidEmail(validateEmail(text));
	};


	const [selectedPicture, setSelectedPicture] = useState(null);
    // convertImageToBase64(url)
    let openImagePickerAsync = async () => {

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
            setSelectedPicture(newSelectedImage);
		}
	}

    const handleImagePicker = () => {
		openImagePickerAsync();
	};

	useEffect(() => {
        // inicializar variables
	}, []);

    const updateData = () => {
        
        const formData = {
			username,
			firstName,
			lastName,
			email,
		};

        UsersController.handleUpdate(formData)
        .then(userReturn => {
			console.log('userReturn: ', userReturn);
			if (userReturn) {
				alert('Los datos del usuario se han actualizado.');
                setUserPreferences({
                    current_user: {
                        name: userReturn.firstname,
                        last: userReturn.lastname,
                        mail: userReturn.Email,
                        // data: userReturn.data,
                    },   
                });
                setFirstname(userReturn.firstname);
                setLastname(userReturn.lastname);
                setEmail(userReturn.Email);
                navigation.navigate('Inicio');
			}
		})
		.catch(error => {
			alert('error: '+error);
		});
	};

    const updatePass = () => {
        // setModalPass(true);
        navigation.navigate('Password');
	};

    const handleFieldChange = (text,field) => {
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

			default:
				break;
		}
	};

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={username}
                        editable={false}
                        // onChangeText={setUsername}
                        onChangeText={(text) => handleFieldChange(text, 'username')}
                    />
                </View>
            </View>

            <ScrollView style={styles.body} >

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={firsname}
                        // onChangeText={setFirstname}
                        onChangeText={(text) => handleFieldChange(text, 'firstname')}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={lastname}
                        // onChangeText={setLastname}
                        onChangeText={(text) => handleFieldChange(text, 'lastname')}
                    />
                </View>

                <View style={[styles.inputContainer,
                    !isValidEmail && styles.invalidInput]}
                >
                    <TextInput
                        keyboardType="email-address"
                        style={styles.input}
                        value={email}
                        autoCapitalize="none"
                        // onChangeText={setEmail}
                        onChangeText={(text) => handleFieldChange(text, 'email')}
                    />
                    {
                        !isValidEmail &&
                        <Text style={styles.errorText}>
                            Correo electrónico inválido
                        </Text>
                    }
                </View>

                { (user.type === 'customer') ? (
                    <View style={styles.imageContainer}>
                        <TouchableOpacity 
                            style={styles.imageButton}
                            onPress={ () => handleImagePicker(0) } > 	
                            <View style={styles.buttonContent}>
                                { (!selectedPicture) ? (
                                    <Text style={styles.imageText}>Foto</Text>
                                ) : 
                                    <Image 
                                        style={styles.image} 
                                        source={{ uri: selectedPicture }} 
                                        />
                                }
                            </View>
                        </TouchableOpacity>
                    </View>
                ) : null }

            </ScrollView>

            <View style={styles.footer}>
                {/* Button */}
				<View style={styles.nextContainer}>
					<TouchableOpacity 
                        style={styles.btnUpdate}
                        onPress={() => updatePass(user)} >
                        <Text style={styles.txtUpdate}>Cambiar Contraseña</Text>
                    </TouchableOpacity>
				</View>  
                {/* Button */}
				<View style={styles.nextContainer}>
					<TouchableOpacity 
                        style={styles.btnUpdate}
                        onPress={updateData} >
                        <Text style={styles.txtUpdate}>Actualizar Datos</Text>
                    </TouchableOpacity>
				</View>    
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'center',
    },
    header: {
        backgroundColor: '#a8ffe5',
    },
    body: {
        backgroundColor: '#a8ffe5',
    },
    inputContainer: {
		flexDirection: 'row',
		backgroundColor: '#fff',
        width:'90%',
		// borderColor: 'lightgreen',
		borderWidth: 1,
		borderRadius: 5,
		marginHorizontal:15,
		marginBottom: 5,
		paddingHorizontal: 15,
		paddingVertical: 3,
	},
    input: {
		color: 'black',
		fontWeight: 'bold',
	},
    btnUpdate: {
        alignSelf:'center',
        alignItems:'center',
		backgroundColor: '#69ACDD',
        width:'90%',
        // height:'40%',
        borderRadius:15,
        marginHorizontal:15,
        marginTop:15,
	},
    txtUpdate: {
        paddingVertical:10,
        fontWeight:'bold'
	},

    imageContainer: {
		height: 75,
		width: 90,
		margin: 25,
		alignSelf: 'center',
		borderRadius: 20,
		backgroundColor: '#fff',
		alignItems: 'center', // Centrar horizontalmente
		justifyContent: 'center', // Centrar verticalmente
	},
    imageButton: {
        alignItems:'center'
	},
    imageText: {
		marginHorizontal:20,
	},
	image: {
		flex: 1,
		height: 75,
		width: 90,
		borderRadius: 20,
        resizeMode: 'cover',
	},
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})

export default ProfileView;