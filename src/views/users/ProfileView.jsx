import React, { useState, useEffect } from 'react';
import { formatDate } from '../utils/Functions'

import * as ImagePicker from "expo-image-picker";
import UsersController from '../../controllers/UsersController';

import { 
    Text, 
    StyleSheet, 
    View,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Image } 
from 'react-native';
import { 
	faEye,
    faEyeSlash
} from '@fortawesome/free-solid-svg-icons';
import { 
	FontAwesomeIcon 
} from '@fortawesome/react-native-fontawesome';


const ProfileView = (userLogin) => {

    const [user, setUser] = useState(userLogin.param);

    const [username, setUsername] = useState(user.user);
    const [password, setPassword] = useState(user.pass);
    const [email,    setEmail]    = useState(user.mail);

    const [iconEye, setIconEye] = useState(false);
    const [secureTextEntryValue, setSecureTextEntryValue] = useState(true);
    
    const handleToggleIcon = () => {
        setIconEye(!iconEye);
        setSecureTextEntryValue(!iconEye);
    };

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

    const update = () => {
        const userReturn = UsersController.handleUpdate(user);

		// if (userReturn != null) {
		// 	// console.log('userReturn', userReturn);
		// 	setUserPreferences({
        //         current_user: {
        //             name: userReturn.firstname,
		// 			user: userReturn.Username,
        //             pass: userReturn.Password,
		// 			mail: userReturn.Email,
        //             type: userReturn.type,
		// 			data: userReturn.data,
        //         },   
        //     });
		// 	// console.log(setUserPreferences);
        //     navigation.navigate('Inicio');
        // }
	};

    return (
        <View style={styles.container}>
            <View style={styles.header}>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={username}
                        onChangeText={setUsername}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={secureTextEntryValue}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity 
                        style={styles.iconEye}
                        onPress={handleToggleIcon}
                        > 	
                        { (iconEye) ? (
                            <View>
                                <FontAwesomeIcon icon={faEye} />
                            </View>
                        ) : 
                            <View>
                                <FontAwesomeIcon icon={faEyeSlash} />
                            </View>
                        }
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView style={styles.body}>

                {/* <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={user.name}
                        // onChangeText={setNombre}
                    />
                </View> */}

                {/* <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={apellido}
                        // onChangeText={setApellido}
                    />
                </View> */}

                <View style={[styles.inputContainer,
                    !isValidEmail && styles.invalidInput]}
                >
                    <TextInput
                        keyboardType="email-address"
                        style={styles.input}
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
                        onPress={update} >
                        <Text style={styles.txtUpdate}>Actualizar</Text>
                    </TouchableOpacity>
				</View>    
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    
    iconEye: {
        flex: 1,
        position:'absolute',
        bottom:5,
        left:50,
        alignSelf:'flex-end',
        marginLeft: 140,
        backgroundColor:'#fff',
        padding: 5,
    },
})

export default ProfileView;