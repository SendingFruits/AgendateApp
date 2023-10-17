import React, { 
    useState, 
    useEffect 
} from 'react';

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

const PassChanger = () => {

    const [iconEye, setIconEye] = useState(false);

    // const updatePass = () => {
    //     // const userReturn = UsersController.handleUpdatePass(password);

	// };

    return (
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
                        onChangeText={(text) => handleFieldChange(text, 'newPassword')}
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
                        onChangeText={(text) => handleFieldChange(text, 'oldPassword')}
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

                <View>
                    <TouchableOpacity 
                        style={styles.btnChangePassword}
                        onPress={changePassword(userLogin)}>
                        <Text>Cambiar</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
		marginHorizontal: 25,
        marginVertical: 25
    }
})

export default PassChanger;