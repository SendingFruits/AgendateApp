import React from 'react';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';
import MultiPicker from '../utils/MultiPicker';
import {convertHour} from '../utils/Functions'

import { 
    useState, useEffect
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


const EditField = ({ icon, text, type, attr, onPress }) => {

    // console.log(text);

    const [editing, setEditing] = useState(false);
    const [editingFields, setEditingFields] = useState({
        'nombre':false,
        'tipo':false,
        'costo':false,
        'comienzo':false,
        'termino':false,
        'descripcion':false,
        'dias':false,
        'ultima':false,
    });

    const [editedText, setEditedText] = useState(text);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDatePicker, setSelectedDatePicker] = useState(new Date());

    const handleDoubleClick = () => {
        setEditing(true);

        // console.log(attr);
        // for (const key in editingFields) {
        //     if (key === attr) {
        //         editingFields[key] = true;
        //     } else {
        //         editingFields[key] = false;
        //     }
        // }
        // setEditingFields(editingFields);
        // console.log(editingFields);
    };
    
    const handleConfirm = () => { 
        setEditing(false);
    };
    
    const handleDateConfirm = (date) => {
        const fecha = new Date(date);
        setSelectedDatePicker(fecha);
        const hora = `${fecha.getHours()}:${String(fecha.getMinutes()).padStart(2, '0')}`;
        var decimal = convertHour(hora, 'toDecimal');
        setEditedText(decimal);
        setDatePickerVisibility(false);
    };

    const renderInputField = () => {
        if (type === 'hour') {
            // console.log('editedText: ', editedText);
            if (editedText != undefined) {       
                var horaDecimal = editedText;
                var hora = convertHour(horaDecimal, 'toHours');
                return (
                    <>
                        <TouchableOpacity onPress={(param) => setDatePickerVisibility(true)}>
                            <View style={styles.container}>
                                {icon && <FontAwesomeIcon icon={icon} style={styles.icon} />}
                                <Text style={styles.text}>{hora}</Text>
                            </View>
                        </TouchableOpacity>
    
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="time"
                            display="spinner"
                            is24Hour={true}
                            date = {selectedDatePicker}
                            minuteInterval={30}
                            onConfirm={(date) => handleDateConfirm(date)}
                            onCancel={() => setDatePickerVisibility(false)}
                        />
                    </>
                );
            }
        } else if (type === 'list') {
            // console.log('text: ', text);
            var list = []
            if (typeof text !== 'undefined' && text !== null) {
                list = (text || '').split(';');
                return (
                    <>
                        <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
                            {/* <View style={styles.picker}>
                                {list.map((item, index) => (
                                    (item !== '') ? (
                                        <View style={styles.day}>
                                            <Text>{item}</Text>
                                        </View>
                                    ) : null
                                ))}
                            </View> */}
                        </TouchableOpacity>
    
                        <MultiPicker list={list} />
    
                        {/* <Picker
                            styles={{ width:'60%' }}
                            selectedValue={editedText}
                            onValueChange={(itemValue) => setEditedText(itemValue)}
                            >
                            {list.map((item, index) => (
                                (item !== '') ? (
                                    <Picker.Item label={item} value={item} key={index} />
                                ) : null
                            ))}
                        </Picker> */}
                    </>
                );
            }
        } else if (type === 'area') {
            return (
                <>
                    <TouchableOpacity 
                        style={ editing && {backgroundColor:'#fff'}}
                        onPress={onPress} 
                        onLongPress={ () => handleDoubleClick(editedText) }
                        >
                        <View>
                            {icon && <FontAwesomeIcon icon={icon} style={styles.icon} />}
                            {editing ? (
                                <View style={styles.editInput}>
                                    <View style={styles.columnT}>
                                        <TextInput
                                            multiline
                                            value={editedText}
                                            onChangeText={(text) => setEditedText(text)}
                                            />
                                    </View>
                                    <View style={styles.columnV}>
                                        <TouchableOpacity
                                            style={styles.btnEdit}
                                            onPress={ () => handleConfirm() }>
                                            <FontAwesomeIcon icon={faCheck} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ) : (
                                <Text>{editedText}</Text>
                            )}
                        </View>
                    </TouchableOpacity>
                </>
            );
        } else if (type === 'date') {
            console.log(text);
            return (
                <>
                    <TouchableOpacity 
                        style={ editing && {backgroundColor:'#fff'}}
                        onPress={onPress} 
                        onLongPress={ () => handleDoubleClick() }
                        >
                    </TouchableOpacity>

                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        // display="spinner"
                        // is24Hour={true}
                        onConfirm={() => handleDateConfirm()}
                        onCancel={() => setDatePickerVisibility(false)}
                    />
                </>
            );
        } else {
            return (
                <>
                    <TouchableOpacity 
                        style={ editing && {backgroundColor:'#fff'}}
                        onPress={onPress} 
                        onLongPress={ () => handleDoubleClick() }
                        >
                        <View style={styles.container}>
                            {icon && <FontAwesomeIcon icon={icon} style={styles.icon} />}
                            {editing ? (
                                <View style={styles.editInput}>
                                    <View style={styles.columnT}>
                                        <TextInput
                                            value={editedText}
                                            onChangeText={(text) => setEditedText(text)}
                                            />
                                    </View>
                                    <View style={styles.columnv}>
                                        <TouchableOpacity
                                            style={styles.btnEdit}
                                            onPress={ () => handleConfirm() }>
                                            <FontAwesomeIcon icon={faCheck} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ) : (
                                <Text style={styles.text}>{editedText}</Text>
                            )}
                        </View>
                    </TouchableOpacity>
                </>
            );
        }
    };
    

    useEffect(() => {
		setEditing(false);
        setDatePickerVisibility(false);
	}, []);

    return <>{renderInputField()}</>;
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
    picker: {
		flexDirection: 'column', 
		alignItems: 'center',
	},
    day: {
		flexDirection: 'row', 
		alignItems: 'center',
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
        position:'relative',
        marginTop: 6,

	},
	icon: {
		color: 'black',
	},

    columnT: {
        width:'90%',
        // backgroundColor:'red',
    },
    columnV: {
        width:'10%',
        // backgroundColor:'green',
    },
});

export default EditField;


const viewOld = () => {
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
}