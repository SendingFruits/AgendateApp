import { 
    AuthContext 
} from '../../context/AuthContext';

import { getBase64FromUri, loadImageFromBase64 } from '../utils/Functions'

import UsersController from '../../controllers/UsersController';
import AlertModal from '../utils/AlertModal';
import MenuButtonItem from '../home/MenuButtonItem';
import CheckBox from '../utils/CheckBox';

import React, { 
    useState, useEffect, useContext 
} from 'react';

import { useNavigation } from '@react-navigation/native';

import * as ImagePicker from "expo-image-picker";

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

const { width, height } = Dimensions.get('window');

const ProfileView = () => {

    const { currentUser, setCurrentUser } = useContext(AuthContext);
    var userLogin = currentUser;
    console.log('ProfileView userLogin: ', userLogin);
    const [widthMax, setWidthMax] = useState(width);
    const [heightMax, setHeightMax] = useState(height);

    const navigation = useNavigation();

    const [user, setUser] = useState(userLogin);
    const [guid, setGuid] = useState(userLogin.guid);

    const [docu, setDocu] = useState(user.docu);
    const [username, setUsername] = useState(user.user);
    const [firstname, setFirstname] = useState(user.name);
    const [lastname, setLastname] = useState(user.last);
    const [movil, setMovil] = useState(user.celu);
    const [email, setEmail] = useState(user.mail);

    const [logoBase, setLogoBase] = useState('');
    const [logoUrl, setLogoUrl] = useState(loadImageFromBase64(userLogin.logo));
    const [selectedPicture, setSelectedPicture] = useState(null);
    
	const [isValidEmail, setIsValidEmail] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [isChecked, setChecked] = useState((user.noti === 'True' ? true : false));

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


    let openLogoPickerAsync = async () => {
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
                const uri = pickerResult.assets[0].uri;
                const base64 = await getBase64FromUri(uri);
                // console.log(base64);
                setLogoBase(base64);
                setSelectedPicture(uri);
                // await AsyncStorage.setItem(username, newSelectedImage);
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
		openLogoPickerAsync();
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
            docu,
			firstname,
			lastname,
			movil,
            email,
            foto:logoBase,
            recibe:isChecked,
		};

        // console.log('formData: ', formData);
        UsersController.handleUpdate(formData,userLogin.type)
        .then(userReturn => {
			console.log('ProfileView userReturn: ', userReturn);
			if (userReturn) {
				alert('Los datos del usuario se han actualizado.');
                setCurrentUser({
                    guid: formData.guid,
                    docu: formData.docu,
                    name: formData.firstname,
                    last: formData.lastname,
                    pass: user.pass,
                    user: user.user,
                    celu: formData.movil,
                    mail: formData.email,
                    logo: formData.foto,
                    noti: formData.recibe,
                    type: user.type,
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
                        setCurrentUser({
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
                            'noti':'none', 
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

    const handleOrientationChange = () => {
        const { width, height } = Dimensions.get('window');
        setWidthMax(width);
        setHeightMax(height);
    };
    

	useEffect(() => {

        setSelectedPicture(logoUrl);

        setUser(userLogin);
        setGuid(userLogin.guid);

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
                                    <Image style={styles.image} source={{ uri: selectedPicture }} />
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
 
                { (user.type === 'customer') ? (      
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={docu}
                            onChangeText={setDocu}
                            // onChangeText={(text) => handleFieldChange(text, 'firstname')}
                        />
                    </View>
                ) : null}
                

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

                <View style={[styles.inputContainer, !isValidEmail && styles.invalidInput]} >
                    <TextInput
                        keyboardType="email-address"
                        style={styles.input}
                        value={email}
                        autoCapitalize="none"
                        onChangeText={(text) => handleEmailChange(text)} />
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