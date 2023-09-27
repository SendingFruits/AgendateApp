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
    Modal,
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

    const [email,    setEmail]    = useState(user.mail);

    const [iconEye1, setIconEye1] = useState(false);
    const [iconEye2, setIconEye2] = useState(false);
    const [secureTextEntryValue1, setSecureTextEntryValue1] = useState(true);
    const [secureTextEntryValue2, setSecureTextEntryValue2] = useState(true);
    
    const handleToggleIcon = (param) => {
        if (param == 1) {
            setIconEye1(!iconEye1);
            setSecureTextEntryValue1(!iconEye1);
        } else {
            setIconEye2(!iconEye2);
            setSecureTextEntryValue2(!iconEye2);
        }
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


    const openModalPass = (user) => {
        setModalPass(true);
    }

    const [modalPass, setModalPass] = useState(false);
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');

	useEffect(() => {
        setIconEye1(false);
        setIconEye2(false);
		setModalPass(false);
        setOldPass('');
        setNewPass('');
	}, []);

    const toggleModal = () => {
        setModalPass(!modalPass);
    };

    const updateData = () => {
        // console.log('user: ', user);
        UsersController.handleUpdate(user)
        .then(userReturn => {
			console.log('userReturn: ', userReturn);
			if (userReturn) {
				alert('Los datos del usuario se han actualizado.');
                setUserPreferences({
                    current_user: {
                        name: userReturn.firstname,
                        last: userReturn.lastname,
                        user: userReturn.Username,
                        pass: userReturn.Password,
                        mail: userReturn.Email,
                        type: userReturn.type,
                        // data: userReturn.data,
                    },   
                });
                navigation.navigate('Inicio');
			}
		})
		.catch(error => {
			alert('error: '+error);
		});

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

    const updatePass = () => {
        setModalPass(true);
	};

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={username}
                        onChangeText={setUsername}
                        editable={false}
                    />
                </View>
            </View>

            <ScrollView style={styles.body}>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={firsname}
                        onChangeText={setFirstname}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={lastname}
                        onChangeText={setLastname}
                    />
                </View>

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
                        onPress={updatePass} >
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

            <Modal 
                visible={modalPass}
                animationType="slide" // Esto define la animación para mostrar el modal
                transparent={true} 
                onBackdropPress={toggleModal} 
                style={styles.modalPass}
                >
                <View style={styles.modalContent}>
                    <TouchableOpacity onPress={toggleModal}>
                        <Text>X</Text>
                    </TouchableOpacity>

                            
                    <View style={styles.dataModal}>
                        <Text style={styles.txtUpdate}>Antigua Contraseña: </Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                // secureTextEntry={secureTextEntryValue}
                                // value={password}
                                // onChangeText={setPassword}
                            />
                            <TouchableOpacity 
                                style={styles.iconEye}
                                // onPress={handleToggleIcon(1)}
                                > 	
                                { (iconEye1) ? (
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
                        <Text style={styles.txtUpdate}>Nueva Contraseña: </Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                // secureTextEntry={secureTextEntryValue}
                                // value={password}
                                // onChangeText={setPassword}
                            />
                            <TouchableOpacity 
                                style={styles.iconEye}
                                // onPress={handleToggleIcon(2)}
                                > 	
                                { (iconEye2) ? (
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


                </View>
            </Modal>
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
        left:65,
        alignSelf:'flex-end',
        marginLeft: 140,
        backgroundColor:'#fff',
        padding: 5,
    },
    modalPass: {
        alignSelf:'center',
        alignItems: 'center',
    },
    modalContent: {
        flex: 1, 
        marginHorizontal: 40,
        marginVertical: 120,
        marginBottom: 220,
        padding: 20,
        alignItems: 'flex-end',
        backgroundColor: '#2ECC71',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#a8ffe5',
    },
    dataModal: {
        flex: 1,
        height: '100%',
		width: '100%', 
        marginTop: 20,
    }
})

export default ProfileView;