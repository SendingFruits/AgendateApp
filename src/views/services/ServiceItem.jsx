import AlertModal from '../utils/AlertModal';
import MultiPicker from '../utils/MultiPicker';
import MenuButtonItem from '../home/MenuButtonItem';
import ServicesController from '../../controllers/ServicesController';

import { 
    formatDate, convertHour, createDateTimeFromDecimalHour
} from '../../views/utils/Functions'; 

import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { 
    useState, useEffect 
} from 'react';

import { 
    Dimensions,
    StyleSheet, 
    Text,
    TextInput,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

import { 
	faTrash,
    faPen
} from '@fortawesome/free-solid-svg-icons';

import { 
	FontAwesomeIcon 
} from '@fortawesome/react-native-fontawesome';

import { LinearGradient } from 'expo-linear-gradient';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ServiceItem = (params) => {
    
    var item = params.item;
    var edit = params.edit;
    var guid = params.guid;

    const [isCollapsed, setIsCollapsed] = useState(true);
    const [bodyHeight, setBodyHeight] = useState(280);
    const [editMode, setEditMode] = useState(false);

    const [nombre, setNombre] = useState(item.nombre);
    const [tipo, setTipo] = useState(item.tipoServicio);
    const [costo, setCosto] = useState(item.costo);
    const [comienzo, setComienzo] = useState(item.horaInicio);
    const [termino, setTermino] = useState(item.horaFin);
    const [turno, setTurno] = useState(item.duracionTurno);

    const [comienzoHora,setComienzoHora]= useState(convertHour(item.horaInicio,'toHours'));
    const [terminoHora, setTerminoHora] = useState(convertHour(item.horaFin, 'toHours'));

    const [descripcion, setDescription] = useState(item.descripcion);
    const [dias, setDias] = useState(item.diasDefinidosSemana);

    const diasList = item.diasDefinidosSemana.split(';').filter(Boolean);

    const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
    const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);

    const [selectedDatePicker1, setSelectedDatePicker1] = useState(new Date());
    const [selectedDatePicker2, setSelectedDatePicker2] = useState(new Date());


    const showDatePicker= (field) => {
        if (field === 'comienzo') {
            setDatePickerVisibility1(true);
            setSelectedDatePicker1(createDateTimeFromDecimalHour(comienzo));
        }
        if (field === 'termino') {
            setDatePickerVisibility2(true);
            setSelectedDatePicker2(createDateTimeFromDecimalHour(termino));
        }
    }

    const handleDateConfirm = (date,field) => {
        // console.log(date);
        
        const fecha = new Date(date);
        const hora = `${fecha.getHours()}:${String(fecha.getMinutes()).padStart(2, '0')}`;
        var decimal = convertHour(hora, 'toDecimal');
    
        if (field == 'comienzo') {
            setSelectedDatePicker1(createDateTimeFromDecimalHour(decimal));
            setComienzo(decimal);
            setComienzoHora(hora);
            // console.log(decimal);
        }
        if (field == 'termino') {
            setSelectedDatePicker2(createDateTimeFromDecimalHour(decimal));
            setTermino(decimal);
            setTerminoHora(hora);
            // console.log(decimal);
        }

        setDatePickerVisibility1(false);
        setDatePickerVisibility2(false);
 
    };

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };
  
    const editItem = () => {
        // console.log('editItem');
        setEditMode(true);
        setBodyHeight(480);
    };

    const saveItem = () => {
        console.log('saveItem');
        setEditMode(false);
        setBodyHeight(280);

        const formData = {
			nombre,
			tipo,
			costo,
			comienzo,
			termino,
			turno,
			descripcion,
			dias,
            guid,
		};

		ServicesController.handleServiceUpdate(formData)
		.then(servReturn => {
			console.log('servReturn: ', servReturn);
			if (servReturn) {
			
			}
		})
		.catch(error => {
			alert(error);
		});
    };

    const deleteItem = () => {
        console.log('deleteItem');
        var text = '¿Seguro desea eliminar este Servicio?';

        AlertModal.showConfirmationAlert(text)
		.then(alertRes => {
			console.log('alertRes: ', alertRes);
			if (alertRes) {
                ServicesController.handleServiceDelete(formData)
                .then(deleted => {
                	console.log('deleted: ', deleted); 
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

    const bodyStyles = isCollapsed ? styles.collapsedBody : styles.expandedBody;
    const footerStyles = isCollapsed ? styles.collapsedFooter : styles.expandedFooter;


	useEffect(() => {
        setEditMode(false);
		setIsCollapsed(false);
        setDatePickerVisibility1(false);
        setDatePickerVisibility2(false);
	}, []);
    
    return (
        <View style={styles.container}>
            {!editMode ? (
                <>
                    <View>
                        <LinearGradient
                            style={styles.header}
                            colors={['#135054', '#e9e9f8', '#efffff']} 
                            start={{ x: 0.2, y: 1.2 }}
                            end={{ x: 1.5, y: 0.5 }} 
                            >    
                            <TouchableOpacity onPress={() => toggleCollapse()} >
                                <View style={styles.textHeader}>
                                    <Text>{item.nombre}</Text>
                                </View>
                            </TouchableOpacity>
        
                            <View style={styles.buttonsRow}>
                                <TouchableOpacity onPress={() => deleteItem()} >
                                    <FontAwesomeIcon icon={faTrash} />
                                </TouchableOpacity>
                            </View>
        
                        </LinearGradient>
                    </View>
        
                    {!isCollapsed ? (
                        <View>
                            <LinearGradient
                                colors={['#fff', '#fff', '#032']} 
                                start={{ x: 0.2, y: 1.2 }}
                                end={{ x: 1.5, y: 0.5 }} 
                                >
                                <View>
                                    <ScrollView style={{ ...styles.body, height: bodyHeight }} >
                                    
                                        <View style={styles.row}>
                                            <View style={styles.columnT}>
                                                <Text style={styles.label}>Tipo:</Text>    
                                            </View>
                                            <View style={styles.columnV}>
                                                <Text> {item.tipoServicio}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.row}>
                                            <View style={styles.columnT}>
                                                <Text style={styles.label}>Costo:</Text>
                                            </View>
                                            <View style={styles.columnV}>
                                                <Text> {item.costo}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.row}>
                                            <View style={styles.columnT}>
                                                <Text style={styles.label}>Comienza:</Text>
                                            </View>
                                            <View style={styles.columnV}>
                                                <Text> {item.horaInicio}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.row}>
                                            <View style={styles.columnT}>
                                                <Text style={styles.label}>Termina:</Text>
                                            </View>
                                            <View style={styles.columnV}>
                                                <Text> {item.horaFin}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.row}>
                                            <View style={styles.columnT}>
                                                <Text style={styles.label}>Descripción:</Text>
                                            </View>
                                            <View style={styles.columnV}>
                                                <Text> {item.descripcion}</Text>
                                            </View>
                                        </View>

                                        <View style={styles.row}>
                                            <View style={styles.columnT}>
                                                <Text style={styles.label}>Duración de Turnos:</Text>
                                            </View>
                                            <View style={styles.columnV}>
                                                <Text>{item.duracionTurno}</Text>
                                            </View>
                                        </View>

                                        <View style={styles.row}>
                                            <View style={styles.columnT}>
                                                <Text style={styles.label}>Dias:</Text>
                                            </View>
                                            <View style={styles.columnV}>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    flexWrap: 'wrap',
                                                }}>
                                                    {diasList.map((dia, index) => (
                                                        <Text key={index}>{dia},</Text>
                                                    ))}
                                                </View>
                                            </View>
                                        </View>
        
                                    </ScrollView>
                                </View>
                            </LinearGradient>
        
                            <View>
                                <LinearGradient
                                    style={styles.footer}
                                    colors={['#135054', '#e9e9f8', '#efffff']} 
                                    start={{ x: 0.2, y: 1.2 }}
                                    end={{ x: 1.5, y: 0.5 }} 
                                    >
        
                                    <View style={styles.btnEdit}>    
                                        <MenuButtonItem 
                                            icon = {null}
                                            text = {'Editar'}
                                            onPress={() => editItem()}
                                        />
                                    </View>
        
                                    {/* {console.log('calendar: ', booking.calendar)} */}
                                    {/* {!booking.calendar ? (
                                        <TouchableOpacity style={styles.btnEdit}>
                                            <Text style={styles.txtbtnEdit}>Editar</Text>
                                        </TouchableOpacity>
                                    ) : (
                                        null
                                    )} */}
                                </LinearGradient>
                            </View>
                        </View>
                    ) : (
                        null
                    )}
                </>
            ) : (
                <>
                    <View>
                        <LinearGradient
                            colors={['#fff', '#fff', '#032']} 
                            start={{ x: 0.2, y: 1.2 }}
                            end={{ x: 1.5, y: 0.5 }} 
                            >
                            <View>
                                <ScrollView style={{ ...styles.body, height: bodyHeight }} >
                                
                                    <View style={styles.row}>
                                        <View style={styles.columnT}>
                                            <Text style={styles.label}>Nombre:</Text>    
                                        </View>
                                        <View style={styles.columnV}>
                                            <TextInput 
                                                style={styles.dataEdit} 
                                                value={nombre}
                                                onChangeText={setNombre}
                                                />
                                        </View>
                                    </View>
                                    <View style={styles.row}>
                                        <View style={styles.columnT}>
                                            <Text style={styles.label}>Tipo:</Text>    
                                        </View>
                                        <View style={styles.columnV}>
                                            <TextInput 
                                                style={styles.dataEdit} 
                                                value={tipo}
                                                onChangeText={setTipo}
                                                />
                                        </View>
                                    </View>
                                    <View style={styles.row}>
                                        <View style={styles.columnT}>
                                            <Text style={styles.label}>Costo:</Text>
                                        </View>
                                        <View style={styles.columnV}>
                                        <TextInput 
                                            style={styles.dataEdit} 
                                            value={costo.toString()}
                                            onChangeText={setCosto}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.row}>
                                        <View style={styles.columnT}>
                                            <Text style={styles.label}>Comienza:</Text>
                                        </View>
                                        <View style={styles.columnV}>
                                            <TouchableOpacity onPress={(param) => showDatePicker('comienzo')}>
                                                <TextInput 
                                                    editable={false}
                                                    style={styles.dataEdit} 
                                                    value={comienzoHora.toString()}
                                                    />
                                            </TouchableOpacity>
                                            <DateTimePickerModal
                                                isVisible={isDatePickerVisible1}
                                                mode="time"
                                                display="spinner"
                                                is24Hour={true}
                                                date = {selectedDatePicker1}
                                                minuteInterval={30}
                                                onConfirm={(date) => handleDateConfirm(date,'comienzo')}
                                                onCancel={() => setDatePickerVisibility1(false)}
                                                />
                                        </View>
                                    </View>
                                    <View style={styles.row}>
                                        <View style={styles.columnT}>
                                            <Text style={styles.label}>Termina:</Text>
                                        </View>
                                        <View style={styles.columnV}>
                                            <TouchableOpacity onPress={(param) => showDatePicker('termino')}>
                                                <TextInput 
                                                    editable={false}
                                                    style={styles.dataEdit} 
                                                    value={terminoHora.toString()}
                                                    />
                                            </TouchableOpacity>
                                            <DateTimePickerModal
                                                isVisible={isDatePickerVisible2}
                                                mode="time"
                                                display="spinner"
                                                is24Hour={true}
                                                date = {selectedDatePicker2}
                                                minuteInterval={30}
                                                onConfirm={(date) => handleDateConfirm(date,'termino')}
                                                onCancel={() => setDatePickerVisibility2(false)}
                                                />
                                        </View>
                                    </View>
                                    <View style={styles.row}>
                                        <View style={styles.columnT}>
                                            <Text style={styles.label}>Descripción:</Text>
                                        </View>
                                        <View style={styles.columnV}>
                                            <TextInput 
                                                multiline
                                                style={styles.dataEdit} 
                                                value={descripcion}
                                                onChangeText={setDescription}
                                                />
                                        </View>
                                    </View>
                                    <View style={styles.row}>
                                            <View style={styles.columnT}>
                                                <Text style={styles.label}>Duración de Turnos:</Text>
                                            </View>
                                            <View style={styles.columnV}>
                                                <Picker
                                                    // style={styles.picker}
                                                    // placeholder="Tipo"
                                                    selectedValue={turno}
                                                    onValueChange={(itemValue) => setTurno(itemValue)}
                                                    // onValueChange={(itemValue) => handleFieldChange(itemValue, 'userType')}
                                                    >
                                                    <Picker.Item label="30 min" value={30} />
                                                    <Picker.Item label="1 hora" value={60} />
                                                </Picker>
                                            </View>
                                        </View>
                                    <View style={styles.row}>
                                        <View style={styles.columnT}>
                                            <Text style={styles.label}>Dias:</Text>
                                        </View>
                                        <View style={styles.columnV}>
                                            {/* <TouchableOpacity>
                                                <TextInput 
                                                    editable={false}
                                                    style={styles.dataEdit} 
                                                    value={terminoHora.toString()}
                                                    />
                                            </TouchableOpacity> */}

                                            <MultiPicker list={diasList} />
                                           
                                        </View>
                                    </View>
    
                                    {/* <View style={styles.row}>
                                        <View style={styles.columnT}>
                                            <Text style={styles.label}>Ultima Fecha:</Text>
                                        </View>
                                        <View style={styles.columnV}>
                                            <Text>{formatDate(item.UltimaFecha)}</Text>
                                        
                                        </View>
                                    </View> */}
    
                                    {/* <EditField 
                                        icon={null} 
                                        text={formatDate(item.UltimaFecha)}
                                        type={'date'}
                                        attr={'ultima'}
                                        onPress={() => editField(item.UltimaFecha)}
                                    /> */}
                                </ScrollView>
                            </View>
                        </LinearGradient>

                        <View>
                            <LinearGradient
                                style={styles.footer}
                                colors={['#135054', '#e9e9f8', '#efffff']} 
                                start={{ x: 0.2, y: 1.2 }}
                                end={{ x: 1.5, y: 0.5 }} 
                                >
    
                                <View style={styles.btnEdit}>    
                                    <MenuButtonItem 
                                        icon = {null}
                                        text = {'Guardar'}
                                        onPress={() => saveItem()}
                                    />
                                </View>
    
                               
                            </LinearGradient>
                        </View>
                    </View> 
                </>
            )}

        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        width: windowWidth - 40,
        marginHorizontal: 20,
        marginVertical: 10,
        justifyContent: 'center',
        borderRadius: 12,
        borderWidth: 1,
        padding:1.5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'baseline',
        paddingHorizontal: 10,
        borderTopLeftRadius:12,
        borderTopRightRadius:12,
    },
    textHeader: {
        flexDirection: 'row',
        alignItems:'baseline',
        fontWeight:'bold',
        paddingVertical:10,
    },
    buttonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position:'relative',
        top:-10,
    },
    body: {
        paddingTop: 15,
        borderTopWidth: 0.5,
        borderTopColor: '#000',
        borderBottomWidth: 1,
        paddingHorizontal:10,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#000',

    },
    columnT: {
        width:'30%',
        paddingLeft:5,
        // backgroundColor:'red',
    },
    columnV: {
        width:'70%',
        paddingRight:1,
        alignItems:'stretch',
        // backgroundColor:'green',
    },

    label: {
        fontWeight:'bold',
    },

    footer: {
        alignItems: 'flex-end',
        backgroundColor:'#9a9',
        borderBottomLeftRadius:12,
        borderBottomRightRadius:12,
    },
    btnEdit: {
        marginEnd: 6,
        padding: 5,
    },
    btnEditCollapse: {
        width:40,
        position:'relative',
        bottom:30,
        left:290,
        backgroundColor: '#2ECC71',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#2d9',
        marginEnd:10,
    },
    txtbtnEdit:{
        color:'#fff'
    },
    dataEdit: {
        textAlign:'right',
        paddingRight:5,
        backgroundColor:'#fff'
    }

});

export default ServiceItem;