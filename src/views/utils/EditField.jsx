import React from 'react';

import { 
    useState 
} from 'react';

import { 
	StyleSheet,
	Text,
    TextInput, 
	TouchableOpacity,
	View,
} from 'react-native';

import { 
	faCheck
} from '@fortawesome/free-solid-svg-icons';

import { 
	FontAwesomeIcon 
} from '@fortawesome/react-native-fontawesome';

import { LinearGradient } from 'expo-linear-gradient';


const EditField = ({ icon, text, type, onPress }) => {

    // console.log(text);

    const [editing, setEditing] = useState(false);
    const [editedText, setEditedText] = useState(text);

    const handleDoubleClick = () => {
        setEditing(true);
    };
    
    const handleConfirm = () => { 
        setEditing(false);
    };
    
	return (	
		// <LinearGradient
		// 	colors={['#135054', '#a8ffff', '#fff']}
		// 	start={{ x: 0.5, y: 0 }}
      	// 	end={{ x: 0.5, y: 1.5 }}
		// 	style={styles.btnAside}
		// 	>

        <TouchableOpacity 
            style={ editing && {backgroundColor:'#fff'}}
            onPress={onPress} 
            onLongPress={ () => handleDoubleClick() }
            >
            <View style={styles.container}>
                {icon && <FontAwesomeIcon icon={icon} style={styles.icon} />}
                {editing ? (
                    <View style={styles.editInput}>
                        <TextInput
                            value={editedText}
                            onChangeText={(text) => setEditedText(text)}
                            />
                            <TouchableOpacity
                                style={styles.btnEdit}
                                onPress={ () => handleConfirm() }>
                                <FontAwesomeIcon icon={faCheck} />
                            </TouchableOpacity>
                    </View>
                ) : (
                    <Text style={styles.text}>{editedText}</Text>
                )}
            </View>
        </TouchableOpacity>

		// </LinearGradient>
	);
};

const styles = StyleSheet.create({
	btnAside: {
		paddingVertical: 10,
		paddingHorizontal: 6,
		marginBottom: 15,
		borderRadius: 10,
	},
	container: {
		flexDirection: 'row', // Alinea los elementos en una fila
		alignItems: 'center', // Alinea los elementos verticalmente al centro
	},
	text: {
		// flex: 1,
		marginLeft: 5,
        textAlign:'auto',
	},
    editInput: {
        // flex: 1,
		flexDirection: 'row',
		alignContent:'space-between',
	},
    btnEdit: {
        marginTop: 5,
		marginStart: 10,
	},
	icon: {
		color: 'black',
	}
});

export default EditField;