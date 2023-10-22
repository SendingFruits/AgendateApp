import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import UsersController from '../../controllers/UsersController';

import { 
    Text, 
    TextInput,
    StyleSheet, 
    TouchableOpacity, 
    View 
} from 'react-native';

import { 
	faEye,
    faEyeSlash
} from '@fortawesome/free-solid-svg-icons';
import { 
	FontAwesomeIcon 
} from '@fortawesome/react-native-fontawesome';

const PassChanger = (params) => {

    var user = params.route.params.userLogin;
    // console.log(user);

    const navigation = useNavigation();

    const [iconEye1, setIconEye1] = useState(false);
    const [iconEye2, setIconEye2] = useState(false);
    const [secureTextEntryValue1, setSecureTextEntryValue1] = useState(true);
    const [secureTextEntryValue2, setSecureTextEntryValue2] = useState(true);
    const [oldpass, setOldPass] = useState('');
    const [newpass, setNewPass] = useState('');

    const handleToggleIconOldPass = () => {
        setIconEye1(!iconEye1);
        setSecureTextEntryValue1(iconEye1);
    };
 
    const handleToggleIconNewPass = () => {
        setIconEye2(!iconEye2);
        setSecureTextEntryValue2(iconEye2);
    };

    const handleEmailChange = (text) => {
		setEmail(text);
		setIsValidEmail(validateEmail(text));
	};

    useEffect(() => {
        setOldPass('');
        setIconEye1(false);
        setNewPass('');
        setIconEye2(false);
	}, []);

    const changePassword = (user) => {

        var valuesChange = {
            'idu': user.guid,
            'old': oldpass,
            'new': newpass,
        }

        UsersController.handleUpdatePass(valuesChange)
		.then(msgReturn => {
			if (msgReturn != null) {
				// console.log('msgReturn: ', msgReturn);	
				// setUserPreferences({
				// 	current_user: {
				// 		pass: user.contrasenia,
				// 	},   
				// });
				navigation.navigate('Inicio');
				alert(msgReturn);
			}
		})
		.catch(error => {
			alert(error);
		});
	};

    const handleFieldChange = (text,field) => {
        // console.log(text);
		switch (field) {
			case 'oldpass':
				setOldPass(text);
				break;
			case 'newpass':
				setNewPass(text);
				break;

			default:
				break;
		}
	};

    return (
        <View style={styles.container}>

            <Text style={styles.txtUpdate}>Contraseña Actual: </Text>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input}
                    secureTextEntry={secureTextEntryValue1}
                    onChangeText={(text) => handleFieldChange(text, 'oldpass')}
                />
                <TouchableOpacity style={styles.iconEye}
                    onPress={() => handleToggleIconOldPass()}
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

            <Text style={styles.txtUpdate}>Contraseña Nueva: </Text>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} 
                    secureTextEntry={secureTextEntryValue2}
                    onChangeText={(text) => handleFieldChange(text, 'newpass')}
                />
                <TouchableOpacity style={styles.iconEye}
                    onPress={() => handleToggleIconNewPass()}
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

            <View>
                <TouchableOpacity 
                    style={styles.btnChangePassword}
                    onPress={() => changePassword(user)} >
                    <Text>Cambiar</Text>
                </TouchableOpacity>
            </View>

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        padding: 20,
        backgroundColor: '#a8ffe5',
        borderWidth: 1,
        borderColor: '#a8ffe5',
    },
    inputContainer: {
		flexDirection: 'row',
		backgroundColor: '#fff',
		borderWidth: 1,
		borderRadius: 5,
		marginHorizontal:15,
		marginBottom: 5,
		paddingHorizontal: 15,
		paddingVertical: 3,
	},
    input: {
        flex : 0.92,
		color: 'black',
		fontWeight: 'bold',
        
	},
    iconEye: {
        flex:0.06,
        alignSelf:'center',
        alignItems: 'flex-end',
        alignContent: 'flex-end',
        backgroundColor:'#fff',
    },
    modalPass: {
        // alignSelf:'center',
        // alignItems: 'center',
    },
    dataModal: {
        // flex: 1,
        // height: '100%',
		// width: '100%', 
        marginTop: 20,
    },
    btnChangePassword: {
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 50,
        backgroundColor: '#69ACDD',
        // width:'50%',
        // height:'40%',
        borderRadius:15,
        borderWidth: 1,
        borderColor: '#a8ffe5',
        padding: 10,
    }
})

export default PassChanger;