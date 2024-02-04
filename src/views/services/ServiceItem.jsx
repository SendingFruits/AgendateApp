import { 
    formatDate, convertHour, createDateTimeFromDecimalHour
} from '../../views/utils/Functions'; 

import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import AlertModal from '../utils/AlertModal';
import MultiPicker from '../utils/MultiPicker';
import ServicesController from '../../controllers/ServicesController';

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


const { width, height } = Dimensions.get('window');

const ServiceItem = (params) => {
    
    var {
        guid,
        item,
        editMode,
        setEditMode,
        navigation,
        onRefresh
    } = params;
   
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [bodyHeight, setBodyHeight] = useState(280); 

    const [nombre, setNombre] = useState(item.nombre);
    const [tipo, setTipo] = useState(item.tipoServicio);
    const [costo, setCosto] = useState(item.costo);
    const [comienzo, setComienzo] = useState(item.horaInicio);
    const [termino, setTermino] = useState(item.horaFin);
    const [turno, setTurno] = useState(item.duracionTurno);
    const [leyendaTurno, setLeyendaTurno] = useState('minutos');

    const [comienzoHora,setComienzoHora]= useState(convertHour(item.horaInicio,'toHours'));
    const [terminoHora, setTerminoHora] = useState(convertHour(item.horaFin, 'toHours'));

    const [descripcion, setDescription] = useState(item.descripcion);


    var [selectedDias, setSelectedDias] = useState(item.diasDefinidosSemana);
    var [diasListArray, setDiasListArray] = useState([]);
    

    const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
    const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);

    const [selectedDatePicker1, setSelectedDatePicker1] = useState(new Date());
    const [selectedDatePicker2, setSelectedDatePicker2] = useState(new Date());


    const handleDiasSelectionChange = (selectedItems) => {
        console.log(selectedItems);
        var joinerArrayInString = selectedItems.join(';');
        setSelectedDias(joinerArrayInString);
        var listAux = joinerArrayInString.split(';');
        setDiasListArray(listAux);
    };


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
  
    const editItem = (p=true) => {
        // console.log('editItem');
        if (p == false) {
            setEditMode(false);
            setBodyHeight(280);
        } else {
            setEditMode(true);
            setBodyHeight(480);
        }
    };

    const saveItem = () => {

        setEditMode(false);
        setBodyHeight(280);

        var id = params.item.id;

        console.log('selectedDias: ',selectedDias);
        setSelectedDias(selectedDias);

        const formData = {
            id,
			nombre,
			tipo,
			costo,
			comienzo,
			termino,
			turno,
			descripcion,
			selectedDias,
            guid,
		};

		ServicesController.handleServiceUpdate(formData)
		.then(servReturn => {
			// console.log('servReturn: ', servReturn);
			if (servReturn) {
                // alert('Se actualizaron los datos del Servicio');
                AlertModal.showAlert('Envio Exitoso','Se actualizaron los datos del Servicio');
                onRefresh();
			}
		})
		.catch(error => {
			alert(error);
		});
    };

    const deleteItem = () => {
        console.log('deleteItem');

        var id = params.item.id;
        var text = '¿Seguro desea eliminar este Servicio?';

        AlertModal.showConfirmationAlert(text)
		.then(alertRes => {
			// console.log('alertRes: ', alertRes);
			if (alertRes) {
                ServicesController.handleServiceDelete(id)
                .then(deleted => {
                    onRefresh();
                })
                .catch(error => {
                	AlertModal.showAlert('Hubo un error', error);
                });
            }
		})
		.catch(error => {
			AlertModal.showAlert('Hubo un error', error);
		});


    };


	useEffect(() => {

        setBodyHeight(280);
        setEditMode(editMode);
		setIsCollapsed(false);
        setDatePickerVisibility1(false);
        setDatePickerVisibility2(false);
    
        setNombre(item.nombre);
        setTipo(item.tipoServicio);
        setCosto(item.costo);
        setComienzo(item.horaInicio);
        setTermino(item.horaFin);
        setTurno(item.duracionTurno);
        setLeyendaTurno('minutos');
        setComienzoHora(convertHour(item.horaInicio,'toHours'));
        setTerminoHora(convertHour(item.horaFin, 'toHours'));
        setDescription(item.descripcion);
        setSelectedDias(item.diasDefinidosSemana);
        setDiasListArray([]);
        setSelectedDatePicker1();
        setSelectedDatePicker2();

        // console.log('selectedDias: ',selectedDias);
        if ((selectedDias !== undefined) && (selectedDias.length > 0)) {
            var listAux = selectedDias.split(';');
            setDiasListArray(listAux);
        }
	}, []);
    
    return (
        <View style={styles.container}>
            {!editMode ? (
                <>
                    <View>
                        <TouchableOpacity onPress={() => toggleCollapse()} >
                            <LinearGradient
                                style={styles.header}
                                colors={['#135054', '#e9e9f8', '#efffff']} 
                                start={{ x: 0.2, y: 1.2 }}
                                end={{ x: 1.5, y: 0.5 }} 
                                >    
                            
                                <View style={styles.textHeader}>
                                    <Text>{item.nombre}</Text>
                                </View>
        
                                <View style={styles.buttonsRow}>
                                    <TouchableOpacity onPress={() => deleteItem()} >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </TouchableOpacity>
                                </View>
        
                            </LinearGradient>
                        </TouchableOpacity>
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
                                                <Text> {comienzoHora}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.row}>
                                            <View style={styles.columnT}>
                                                <Text style={styles.label}>Termina:</Text>
                                            </View>
                                            <View style={styles.columnV}>
                                                <Text> {terminoHora}</Text>
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

                                                {item.duracionTurno === 1 ? (
                                                    <>
                                                        <Text>{item.duracionTurno} {"Hora"}</Text>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Text>{item.duracionTurno} {"Minutos"}</Text>
                                                    </>
                                                )}

                                            </View>
                                        </View>

                                        <View style={styles.row}>
                                            <View style={styles.columnT}>
                                                <Text style={styles.label}>Dias:</Text>
                                            </View>
                                            <View style={styles.columnV}>

                                                {/* {console.log(diasListArray)} */}

                                                {diasListArray && diasListArray !== undefined ? (
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        flexWrap: 'wrap',
                                                    }}>
                                                        {diasListArray.map((dia, index) => (
                                                            <Text key={index}>{dia},</Text>
                                                        ))}
                                                    </View>
                                                ) : (
                                                    <Text>No hay días seleccionados</Text>
                                                )}
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
        
                                    {/* {item.estado === 'Solicitada' ? ( */}
                                    <>
                                        <LinearGradient
                                            style={styles.cancel}
                                            colors={['#d8ffff', '#D0E4D0', '#2ECC71']}
                                            // colors={['#135054', '#e9e9f8', '#efffff']} 
                                            start={{ x: 0.2, y: 1.2 }}
                                            end={{ x: 1.5, y: 0.5 }} 
                                            >       
                                            <TouchableOpacity
                                                onPress={() => editItem()}> 
                                                <Text style={{color:'#000', textAlign:'center' }}>Editar</Text>
                                            </TouchableOpacity>   
                                        </LinearGradient>
                                    </>
                                    {/* ) : null } */}

                                    {/* <View style={styles.btnEdit}>    
                                        <MenuButtonItem 
                                            icon = {null}
                                            text = {'Editar'}
                                            onPress={() => editItem()}
                                        />
                                    </View> */}
        
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
                                           
                                            <MultiPicker 
                                                list={diasListArray} 
                                                onSelectionChange={(selectedItems) => handleDiasSelectionChange(selectedItems)}
                                                />
                                           
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

                                <View style={styles.btns}>

                                    <>
                                        <LinearGradient
                                            style={styles.cancel}
                                            colors={['#d8ffff', '#D0E4D0', '#2ECC71']}
                                            // colors={['#135054', '#e9e9f8', '#efffff']} 
                                            start={{ x: 0.2, y: 1.2 }}
                                            end={{ x: 1.5, y: 0.5 }} 
                                            >       
                                            <TouchableOpacity
                                                onPress={() => editItem(false)}>
                                                <Text style={{color:'#000', textAlign:'center' }}>Cancelar</Text>
                                            </TouchableOpacity>   
                                        </LinearGradient>
                                    </>

                                    {/* <View style={styles.btnEdit}>    
                                        <MenuButtonItem 
                                            icon = {null}
                                            text = {'Cancelar'}
                                            onPress={() => editItem(false)}
                                        />
                                    </View> */}


                                    <>
                                        <LinearGradient
                                            style={styles.cancel}
                                            colors={['#d8ffff', '#D0E4D0', '#2ECC71']}
                                            // colors={['#135054', '#e9e9f8', '#efffff']} 
                                            start={{ x: 0.2, y: 1.2 }}
                                            end={{ x: 1.5, y: 0.5 }} 
                                            >       
                                            <TouchableOpacity
                                                onPress={() => saveItem()}>
                                                <Text style={{color:'#000', textAlign:'center' }}>Guardar</Text>
                                            </TouchableOpacity>   
                                        </LinearGradient>
                                    </>
                                    
                                    {/* <View style={styles.btnEdit}>    
                                        <MenuButtonItem 
                                            icon = {null}
                                            text = {'Guardar'}
                                            onPress={() => saveItem()}
                                        />
                                    </View> */}
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
        width: width - 5,
        // marginHorizontal: 20,
        marginVertical: 5,
        justifyContent: 'center',
        borderRadius: 8,
        borderTopWidth: 0.8,
        borderBottomWidth: 0.8,
        padding:1.2,
    },
    header: {
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    textHeader: {
        flexDirection: 'row',
        alignItems:'baseline',
        fontWeight:'bold',
        marginStart:10,
        paddingVertical:10,
    },
    buttonsRow: {
        alignContent:'flex-end',
        // alignItems:'flex-end',
        // alignSelf:'flex-end',
        // justifyContent: 'space-between',
        position:'relative',
        top:10,
        right:10,
    },
    body: {
        width: width - 5,
        // height: 100,
        borderTopWidth: 1,
        borderTopColor: '#555',
        borderBottomWidth: 1,
        borderBottomColor: '#556',
        paddingHorizontal:8,
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
        paddingVertical:6,

        backgroundColor:'#9a9',
        // borderBottomLeftRadius:12,
        // borderBottomRightRadius:12,
    },

    btns: {
        flexDirection:'row',

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
    },

    cancel: { 
        padding: 10,
        marginHorizontal: 5,
        margin: 10,
        backgroundColor:'#135054',
        borderRadius: 10,
        width: 85,
    }

});

export default ServiceItem;