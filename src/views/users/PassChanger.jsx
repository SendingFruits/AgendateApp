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
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                // secureTextEntry={secureTextEntryValue}
                // value={password}
                // onChangeText={setPassword}
            />
            <TouchableOpacity 
                style={styles.iconEye}
                // onPress={handleToggleIcon}
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