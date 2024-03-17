import { useNavigation } from '@react-navigation/native';

import AlertModal from '../utils/AlertModal';
import DaysSelector from '../utils/DaysSelector';
import MenuButtonItem from '../home/MenuButtonItem';
import ServicesController from '../../controllers/ServicesController';

import { Picker } from '@react-native-picker/picker';

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
    Keyboard
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const PromoCreate = ( params ) => {
    
    var {
        guid,
        isCreate,
        setIsCreate
    } = params.route.params;

    const navigation = useNavigation();

    var jsonString = '{"Lunes": {"horaInicio": 0,"horaFin": 0},\n"Martes": {"horaInicio": null,"horaFin": null},\n"Miercoles": {"horaInicio": null,"horaFin": null},\n"Jueves": {"horaInicio": null,"horaFin": null},\n"Viernes": {"horaInicio": null,"horaFin": null},\n"Sabado": {"horaInicio": null,"horaFin": null},\n"Domingo": {"horaInicio": null,"horaFin": null}}';
    var edit = false;

    const [bodyHeight, setBodyHeight] = useState(480); 

    const [nombre, setNombre] = useState('');
    const [tipo, setTipo] = useState('');
    const [costo, setCosto] = useState(0);
    const [turno, setTurno] = useState(30);
    const [descripcion, setDescription] = useState('');
    const [dias, setDias] = useState(JSON.parse(jsonString));
    // JSON.parse(item.jsonDiasHorariosDisponibilidadServicio)

    const [marginStatusTop, setMarginStatusTop] = useState(0);

    const saveItem = () => {

        const formData = {
			nombre,
			tipo,
			costo,
			turno,
			descripcion,
			dias,
            guid,
		};

		ServicesController.handlePromoCreate(formData)
		.then(servReturn => {
			console.log('servReturn: ', servReturn);
			if (servReturn) {
                AlertModal.showAlert('Envio Exitoso', 'Se creó el Servicio');
                setIsCreate(true);
                navigation.navigate('Servicios', { isCreate });
                // navigation.goBack();
			}
		})
		.catch(error => {
			alert(error);
		});
    };

	useEffect(() => {
        setBodyHeight(560); 

        setNombre('');
        setTipo('');
        setCosto(0.00);
        setTurno(30);
        setDescription('');

        setDias(JSON.parse(jsonString));

        /**
         * esto sirve para controlar el teclado:
         */
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow', () => {
                // console.log('Teclado abierto');
                setMarginStatusTop(20);
                setBodyHeight(450);
            }
        );     
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                // console.log('Teclado cerrado');
                setMarginStatusTop(0);
                setBodyHeight(560);
            }
        );

	}, [edit]);
    
    return (
        <View style={styles.container}>
            <View>
                <LinearGradient
                    colors={['#fff', '#fff', '#032']} 
                    start={{ x: 0.2, y: 1.2 }}
                    end={{ x: 1.5, y: 0.5 }} 
                    >
                    <View>
                        <ScrollView style={{ ...styles.body, height: bodyHeight, marginTop:marginStatusTop }} >
                        
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
                                            <Picker.Item label="1 hora" value={1} />
                                        </Picker>
                                    </View>
                            </View>
                            <View style={styles.row}>
                                <View style={styles.column}>
                                    <Text style={styles.label}>Dias de Actividad</Text>
                                </View>
                            </View>
                            <View style={styles.row}>
                                <DaysSelector dias={dias} setDias={setDias} create={true} />
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

                            <View style={{marginEnd:10, marginTop:7}}>
                                <MenuButtonItem 
                                    icon = {null}
                                    text = {'Guardar'}
                                    onPress={() => saveItem()}
                                />
                            </View>
                            <View style={{marginEnd:5, marginTop:7}}>
                                <MenuButtonItem 
                                    icon = {null}
                                    text = {'Cancelar'}
                                    onPress={() => navigation.navigate('Servicios')}
                                />

                            </View>
                        </View>

                    </LinearGradient>
                </View>
            </View> 
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
        // borderTopWidth: 1,
        borderTopColor: '#555',
        borderBottomWidth: 1,
        borderBottomColor: '#556',
        paddingHorizontal:8,
        marginTop: 10
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#000',

    },
    column: {
        width:'100%',
        paddingLeft:5,
        // backgroundColor:'red',
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
    btnEdit: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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

export default PromoCreate;