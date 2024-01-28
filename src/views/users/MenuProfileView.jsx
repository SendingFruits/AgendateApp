import { UserContext } from '../../services/context/context'; 
import { formatDate } from '../utils/Functions'
import { useNavigation } from '@react-navigation/native';

import React, { 
    useState, 
    useEffect, 
    useContext 
} from 'react';

// import DeviceInfo from 'react-native-device-info-2';

import * as ImagePicker from "expo-image-picker";
import UsersController from '../../controllers/UsersController';

import MenuButtonItem from '../home/MenuButtonItem';
import PassChanger from './PassChanger';

import { 
    Text, 
    StyleSheet, 
    View,
    ScrollView,
    RefreshControl,
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


import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';


const MenuProfileView = (userLogin) => {

    const navigation = useNavigation();

    const { setUserPreferences } = useContext(UserContext);

    const [user, setUser] = useState(userLogin.param);
    const [guid, setGuid] = useState(user.guid);

    const [username, setUsername] = useState(user.user);
    const [firstname, setFirstname] = useState(user.name);
    const [lastname, setLastname] = useState(user.last);
    const [movil, setMovil] = useState(user.celu);
    const [email, setEmail] = useState(user.mail);

	const [isValidEmail, setIsValidEmail] = useState(true);
    const [selectedPicture, setSelectedPicture] = useState(null);
    const [refreshing, setRefreshing] = useState(false);


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
        console.log(storedImageUri);
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
            // setFirstname(user.name);
            // setLastname(user.last);
            // setMovil(user.celu);
            // setEmail(user.mail);
            // setSelectedPicture(null);
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
        navigation.navigate('Password');
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


	useEffect(() => {
        // inicializar variables

        // console.log(DeviceInfo); // no funciona ningun metodo...
        // try {
        //     const phoneNumber = DeviceInfo; 
        //     console.log('Número de teléfono:', phoneNumber);
        // } catch (error) {
        //     console.error('Error al obtener el número de teléfono:', error);
        // } 

        openImageSavedAsync();
	}, []);

    return (
        <View style={styles.container}>

            <ScrollView 
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                } >

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
                        onChangeText={setEmail}
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
                    <View style={styles.imageContainer}>
                        <TouchableOpacity 
                            style={styles.imageButton}
                            onPress={ () => handleImagePicker(0) } > 	
                            {/* file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540ethelvan%252Fagendate-app/ImagePicker/a67ed7c4-a8b9-4e8f-9e89-ee6812f4a5dc.jpeg */}
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

                <View style={{ marginHorizontal:25, marginTop:15, textAlign:'center' }}>
                    <MenuButtonItem 
                        icon = {null}
                        text = {'Cambiar Contraseña'}
                        onPress={() => updatePass(user)}
                    /> 

                    <MenuButtonItem
                        style={{marginHorizontal:20}}
                        icon = {null}
                        text = {'Actualizar Datos'}
                        onPress={() => updateData()}
                    />
                </View>
                

				{/*<View style={styles.nextContainer}>
					<TouchableOpacity 
                        style={styles.btnUpdate}
                        onPress={() => updatePass(user)} >
                        <Text style={styles.txtUpdate}>Cambiar Contraseña</Text>
                    </TouchableOpacity>
				</View>  
             
				<View style={styles.nextContainer}>
					<TouchableOpacity 
                        style={styles.btnUpdate}
                        onPress={() => updateData()} >
                        <Text style={styles.txtUpdate}>Actualizar Datos</Text>
                    </TouchableOpacity>
				</View>*/}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'center',
    },
   
    inputContainer: {
		flexDirection: 'row',
		backgroundColor: '#fff',
        width:'90%',
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

export default MenuProfileView;