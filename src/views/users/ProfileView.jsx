import { UserContext } from '../../services/context/context'; 
import { useNavigation } from '@react-navigation/native';
import { getOrientation } from '../utils/Functions';

import React, { 
    useState, useEffect, useContext 
} from 'react';

// import DeviceInfo from 'react-native-device-info-2';

import * as ImagePicker from "expo-image-picker";
import UsersController from '../../controllers/UsersController';
import AlertModal from '../utils/AlertModal';
import MenuButtonItem from '../home/MenuButtonItem';
import CheckBox from '../utils/CheckBox';

import {
    Dimensions,
    Text, 
    StyleSheet, 
    View,
    ScrollView,
    RefreshControl,
    TextInput,
    TouchableOpacity,
    Image,
    Keyboard
} from 'react-native';


import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const ProfileView = ( params ) => {

    const [widthMax, setWidthMax] = useState(width);
    const [heightMax, setHeightMax] = useState(height);

    var userLogin = params.route.params;
    const { setUserPreferences } = useContext(UserContext);
    const navigation = useNavigation();

    const [user, setUser] = useState(userLogin);
    const [guid, setGuid] = useState(userLogin.guid);

    const [username, setUsername] = useState(user.user);
    const [firstname, setFirstname] = useState(user.name);
    const [lastname, setLastname] = useState(user.last);
    const [movil, setMovil] = useState(user.celu);
    const [email, setEmail] = useState(user.mail);

	const [isValidEmail, setIsValidEmail] = useState(true);
    const [selectedPicture, setSelectedPicture] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [isChecked, setChecked] = useState(false);

    const [oldpass, setOldPass] = useState('');
    const [newpass, setNewPass] = useState('');

    const [showButtons, setShowButtons] = useState(true);

	const validateEmail = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const handleEmailChange = (text) => {
		setEmail(text);
		setIsValidEmail(validateEmail(text));
	};


    let openImagePickerAsync = async () => {
        try {
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
    
                await AsyncStorage.setItem(username, newSelectedImage);
            }
            
        } catch (error) {
           alert('Error al manejar la selección de imagen. ', error);
        }
	}

    let openImageSavedAsync = async () => {
        const storedImageUri = await AsyncStorage.getItem(username);
        // console.log(storedImageUri);
        if (storedImageUri) {
            setSelectedPicture(storedImageUri);
        }
    }


    const handleImagePicker = () => {
		openImagePickerAsync();
	};

    const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
            
		}, 2000);
	}, []);


    const updateData = () => {
        
        const formData = {
            guid,
			firstname,
			lastname,
			movil,
            email,
		};

        // console.log('formData: ', formData);
        UsersController.handleUpdate(formData)
        .then(userReturn => {
			// console.log('userReturn: ', userReturn);
			if (userReturn) {
				alert('Los datos del usuario se han actualizado.');
                setUserPreferences({
                    current_user: {
                        guid: formData.guid,
                        name: formData.firstname,
                        last: formData.lastname,
						pass: user.pass,
						user: user.user,
                        celu: formData.movil,
						mail: formData.email,
						type: 'customer',
                    },   
                });

                // setUser(userReturn);
                onRefresh();
			}
		})
		.catch(error => {
			alert(error);
		});
	};

    const updatePass = () => {
        // setModalPass(true);
        // navigation.navigate('Password',{
        //     oldpass: oldpass,
        //     setOldPass: setOldPass,
        //     newpass: newpass,
        //     setNewPass: setNewPass
        // });
        navigation.navigate('Password');
	};

    const deleteAccount = () => {
        var text = "¿Está seguro que desea eliminar su cuenta?";
        AlertModal.showConfirmationAlert(text)
		.then(alertRes => {
			// console.log('alertRes: ', alertRes);
			if (alertRes) {
                UsersController.handleDelete(user.guid)
                .then(resDelete => {
                    // console.log('userReturn: ', userReturn);
                    if (resDelete) {
                        setUserPreferences({
                            current_user : {
                                'guid':'none',
                                'name':'none',
                                'last':'none',
                                'user':'none',
                                'pass':'none',
                                'type':'none',
                                'mail':'none', 
                                'docu':'none',
                                'celu':'none',
                                'logo':'none', 
                            },   
                        });
                        onRefresh();
                        navigation.navigate('Inicio');
                        AlertModal.showAlert('La cuenta fue eliminada');
                    }
                })
                .catch(error => {
                    alert(error);
                });
            }
		})
		.catch(error => {
			alert(error);
		});
	};


    const handleFieldChange = (text,field) => {
		switch (field) {
			case 'username':
				setUsername(text);
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

    const handleOrientationChange = () => {
        const { width, height } = Dimensions.get('window');
        setWidthMax(width);
        setHeightMax(height);

        // if (getOrientation() === 'portrait') {
        //     setContainer({
        //         flex: 1,
        //         width: widthMax,
        //         height: heightMax
        //     });
        // } else {

        // }
    };
    

	useEffect(() => {
        setOldPass('');
        setNewPass('');
        Dimensions.addEventListener('change', handleOrientationChange);
        openImageSavedAsync();

        /**
         * esto sirve para controlar el teclado:
         */
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow', () => {
                // console.log('Teclado abierto');
                setShowButtons(false);
            }
        );     
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                // console.log('Teclado cerrado');
                setShowButtons(true);
            }
        );
	}, []);

    return (
        <View style={styles.container}>

            <ScrollView 
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                } >

                { (user.type === 'customer') ? (
                    <View style={styles.imageContainer}>
                        <TouchableOpacity 
                            style={styles.imageButton}
                            onPress={ () => handleImagePicker(0) } > 	
                            {/* file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540ethelvan%252Fagendate-app/ImagePicker/a67ed7c4-a8b9-4e8f-9e89-ee6812f4a5dc.jpeg */}
                            <View style={styles.buttonImageContent}>
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
                ) : 
                    <View style={{ padding: 20 }}>
                        <TouchableOpacity>
                            <></>
                        </TouchableOpacity>
                    </View>
                }

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={username}
                        editable={false}
                        // onChangeText={setUsername}
                        // onChangeText={(text) => handleFieldChange(text, 'username')}
                    />
                </View>
 
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={firstname}
                        onChangeText={setFirstname}
                        // onChangeText={(text) => handleFieldChange(text, 'firstname')}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={lastname}
                        onChangeText={setLastname}
                        // onChangeText={(text) => handleFieldChange(text, 'lastname')}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={movil}
                        onChangeText={setMovil}
                        // onChangeText={(text) => handleFieldChange(text, 'movil')}
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
                        onChangeText={(text) => handleEmailChange(text)}
                        // onChangeText={(text) => handleFieldChange(text, 'email')}
                    />
                    {
                        !isValidEmail &&
                        <Text style={styles.errorText}>
                            Correo electrónico inválido
                        </Text>
                    }
                </View>


                { (user.type === 'customer') ? (
                    <View style={styles.checkContainer}>
                        <CheckBox 
                            type={'normal'}
                            text={'Recibir promociones por correo'}
                            isChecked={isChecked}
                            setChecked={setChecked}
                            />
                    </View>
                ) : null }
                
                {/* <View>
                    <Text>{oldpass}</Text>
                    <Text>{newpass}</Text>
                </View> */}

            </ScrollView>

            {showButtons ? (
                <View style={styles.footer}>

                    <View style={styles.buttons}>
                        <MenuButtonItem 
                            icon = {null}
                            text = {'Cambiar Contraseña'}
                            onPress={() => updatePass()}
                        /> 

                        <MenuButtonItem
                            style={{marginHorizontal:20}}
                            icon = {null}
                            text = {'Actualizar Datos'}
                            onPress={() => updateData()}
                        />

                        <MenuButtonItem
                            style={{marginHorizontal:20}}
                            icon = {null}
                            text = {'Eliminar Cuenta'}
                            onPress={() => deleteAccount()}
                        />
                    </View>
                </View>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
   
    inputContainer: {
		flexDirection: 'column',
		backgroundColor: '#fff',
        
		borderWidth: 1,
		borderRadius: 5,
		marginHorizontal:45,
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
        borderRadius:15,
        marginHorizontal:15,
        marginTop:15,
	},
    txtUpdate: {
        paddingVertical:10,
        fontWeight:'bold'
	},

    imageContainer: {
		height: 120,
		width: 120,
		margin: 10,
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
		height: 120,
		width: 120,
		borderRadius: 20,
        resizeMode: 'cover',
	},
    buttonImageContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttons: { 
        marginHorizontal:45, 
        marginBottom:15, 
        textAlign:'center' 
    },

    checkContainer: {
		flex: 1,
        flexDirection: 'column',
        alignItems:'center',
		marginHorizontal:20,
		marginVertical:25,
	},
})

export default ProfileView;