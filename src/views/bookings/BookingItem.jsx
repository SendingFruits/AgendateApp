import { formatDate } from '../../views/utils/Functions'; 

import { 
    useState, useEffect 
} from 'react';

import UsersController from '../../controllers/UsersController';
import BookingController from '../../controllers/BookingController';
import MenuButtonItem from '../home/MenuButtonItem';
import AlertModal from '../utils/AlertModal';

import { 
    Dimensions,
    StyleSheet, 
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

import { 
	faCircleXmark,
    faCircleCheck
} from '@fortawesome/free-solid-svg-icons';

import { 
	FontAwesomeIcon 
} from '@fortawesome/react-native-fontawesome';

import { LinearGradient } from 'expo-linear-gradient';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const BookingItem = ( params ) => {

    console.log('params: ', params);
    var {
        index,
		item, 
		onRefresh,
        onPress,
	} = params;

    // var item = params.item;

    var dateString = item.fechaHoraTurno.split('T');
    var fecha = formatDate(dateString[0]);
    var hora = dateString[1].slice(0, -3);

    const [isCollapsed, setIsCollapsed] = useState(false);
    const [bodyHeight, setBodyHeight] = useState(200);

    const setStatusColor = (estado) => {
        switch (estado) {
            case 'Realizada':
                return 'green';
            case 'Pendiente':
                return 'orange'; 
            case 'Solicitada':
                return 'blue'; 
            case 'Cancelada':
                return 'red'; 
            default:
                return 'black';
        }
    };

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };
  
    const editItem = () => {
        console.log('editItem');
    };

    const editName = () => {
        console.log('editName');
    };

    const cancellation = (id) => {
        console.log('cancellation of: ', id);
        var text = '¿Seguro desea cancelar la Reserva?';

        AlertModal.showConfirmationAlert(text)
		.then(alertRes => {
			console.log('alertRes: ', alertRes);
			if (alertRes) {
                BookingController.handleCancelBooking(id)
                .then(resDelete => {
                    // console.log('userReturn: ', userReturn);
                    if (resDelete) {
                        onRefresh();
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

    const bodyStyles = isCollapsed ? styles.collapsedBody : styles.expandedBody;
    const footerStyles = isCollapsed ? styles.collapsedFooter : styles.expandedFooter;


	useEffect(() => {
		setIsCollapsed(false);
	}, []);
    
    return (
        <View style={styles.container}>
            <View>
                <LinearGradient
                    style={styles.header}
                    colors={['#135054', '#e9e9f8', '#efffff']} 
                    start={{ x: 0.2, y: 1.2 }}
                    end={{ x: 1.5, y: 0.5 }} 
                    >    
                    <TouchableOpacity 
                        onPress={() => toggleCollapse()} 
                        onLongPress={() => editName()}
                        >
                        <View style={styles.textHeader}>
                            <Text>Reserva para el</Text>
                            
                            <Text style={{ marginLeft:1, fontWeight:'bold' }}> {fecha}</Text>
                            <Text style={{ fontWeight:'bold' }}> {hora}</Text>
                            
                            {/* {console.log('item.id: ', item.id)} */}

                            {item.estado === 'Solicitada' ? (
                                <>
                                    <Text style={{ 
                                        fontWeight:'bold', 
                                        marginHorizontal:15,
                                        color: setStatusColor(item.estado) 
                                        }}> {item.estado}
                                    </Text>
                                    <TouchableOpacity
                                        style={{ position:'relative', top:-12}}
                                        onPress={() => cancellation(item.id)} > 
                                        <FontAwesomeIcon icon={faCircleXmark} />
                                    </TouchableOpacity>
                                </>
                            ) : (
                                <>
                                    <Text style={{ 
                                        fontWeight:'bold', 
                                        marginHorizontal:15, 
                                        color: setStatusColor(item.estado) 
                                        }}> {item.estado}
                                    </Text>
                                    <View style={{ position:'relative', top:-12}} >                                        
                                        <FontAwesomeIcon icon={faCircleCheck} />
                                    </View>
                                </>
                            ) }
                            
                            {/* 
                                "rubro": "Gastronomia",
                                "ciudad": "Montevideo",
                                "costo": 300,
                                "diasDefinidosSemana": "Lunes;Miercoles;Viernes", 
                                "direccion": "Vilardebo 4565", 
                                "duracionTurno": 30, 
                                "estado": "Solicitada", 
                                "fechaHoraTurno": "2024-01-01T09: 30: 00", 
                                "horaFinServicio": 18, 
                                "horaInicioServicio": 9, 
                                "id": 2, 
                                "idCliente": 1, 
                                "idServicio": 1, 
                                "latitude": -34.84784, 
                                "longitude": -56.177822
                            */}
                        </View>
                    </TouchableOpacity>

                </LinearGradient>
            </View>

            {!isCollapsed ? (
                <View>
                    <LinearGradient
                        colors={['#fffefe', '#ffffee', '#135054']} 
                        start={{ x: 0.2, y: 1.2 }}
                        end={{ x: 1.5, y: 0.5 }} 
                        >
                        <View>
                            <ScrollView style={{ ...styles.body, height: bodyHeight }} >
                            
                                <View>
                                    <View style={styles.row}>
                                        <Text style={styles.label}>Empresa:</Text>
                                        <Text style={styles.value}>{item.nombreEmpresa}</Text>
                                    </View>
                                    <View style={styles.rowInvi}>
                                        <Text>{item.descripcionEmpresa}</Text>
                                    </View>
                                    <View>
                                        <Text>Rubro: {item.rubro}</Text>
                                        <Text>Ciudad: {item.ciudad}</Text>
                                        <Text>Celular:</Text>
                                    </View>
                                </View>

                                <View> 
                                    <View style={{ ...styles.row, marginTop:10 }}>
                                        <Text style={styles.label}>Servicio:</Text>
                                        <Text style={styles.value}>{item.nombreServicio}</Text>
                                    </View>

                                    <View style={styles.rowInvi}>
                                        <Text>{item.descripcion}</Text>
                                    </View>

                                    <View style={styles.row}>
                                        {/* <Text style={styles.label}>Comienza:</Text> */}
                                        {/* <Text style={styles.value}>{formatDate(booking.dateInit)}</Text> */}
                                    </View>
                                    <View style={styles.row}>
                                        {/* <Text style={styles.label}>Termina:</Text> */}
                                        {/* <Text style={styles.value}>{formatDate(booking.dateEnd)}</Text> */}
                                    </View>
                                </View>

                                {/* -
                                    "costo": 300,
                                    "diasDefinidosSemana": "Lunes;Miercoles;Viernes", 
                                    "direccion": "Vilardebo 4565", 
                                    "duracionTurno": 30, 
                                    "estado": "Solicitada", 
                                    "fechaHoraTurno": "2024-01-01T09: 30: 00", 
                                    "horaFinServicio": 18, 
                                    "horaInicioServicio": 9, 
                                    "id": 2, 
                                    "idCliente": 1, 
                                    "idServicio": 1, 
                                    "latitude": -34.84784, 
                                    "longitude": -56.177822
                                */}

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
            ) : null }

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
    
    body: {
        width: windowWidth - 55,
        // height: 100,
        borderTopWidth: 1,
        borderTopColor: '#555',
        borderBottomWidth: 1,
        borderBottomColor: '#556',
        paddingHorizontal:10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#000',

    },
    rowInvi: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        marginBottom: 10,

    },
    label: {
        width: '45%',
        fontWeight:'bold',
    },
    value: {
        width: '45%',
        textAlign: 'right',
    },

    footer: {
        alignItems: 'flex-end',
        paddingVertical:6,
        
        backgroundColor:'#9a9',
        borderBottomLeftRadius:12,
        borderBottomRightRadius:12,
    },
    btnEdit: {
        backgroundColor: '#2ECC71',
        padding: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#2d9',
        marginEnd:10,
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
    }
});

export default BookingItem;