import { formatDate } from '../../views/utils/Functions'; 

import { 
    useState, useEffect 
} from 'react';

import UsersController from '../../controllers/UsersController';
import MenuButtonItem from '../home/MenuButtonItem';

import { 
    Dimensions,
    StyleSheet, 
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

import { 
	faTrash
} from '@fortawesome/free-solid-svg-icons';

import { 
	FontAwesomeIcon 
} from '@fortawesome/react-native-fontawesome';

import { LinearGradient } from 'expo-linear-gradient';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const BookingItem = (params) => {
    
    var item = params.item;
    // console.log('item: ',item);

    // var dateString = item.FechaHoraReserva.split(' ');
    // var fecha = formatDate(dateString[0]);
    // var hora = dateString[1].slice(0, -3);

    const [isCollapsed, setIsCollapsed] = useState(true);
    const [bodyHeight, setBodyHeight] = useState(200);

    const set__Color = (estado) => {
        switch (estado) {
            case 'Realizada':
                return 'green'; // Color para estado "Realizada"
            case 'Pendiente':
                return 'orange'; // Color para estado "Pendiente"
            case 'Cancelada':
                return 'red'; // Color para estado "Cancelada"
            default:
                return 'black'; // Color por defecto
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

    const deleteItem = () => {
        console.log('deleteItem');
    };

    const bodyStyles = isCollapsed ? styles.collapsedBody : styles.expandedBody;
    const footerStyles = isCollapsed ? styles.collapsedFooter : styles.expandedFooter;


	useEffect(() => {
		setIsCollapsed(false);
	}, []);
    
    // {
    //     "cost": 2000,
    //     "dateEnd": "2023-11-30",
    //     "dateInit": "2023-11-01",
    //     "days": [],
    //     "description": "",
    //     "duration": 0.5,
    //     "frequency": 7,
    //     "idCompany": 2,
    //     "idService": 2,
    //     "name": "Pedidos a Retirar",
    //     "quotas": 20,
    //     "type": "Comida"
    // }

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
                            {/* <Text>Reserva</Text> */}
                            <Text> {item.Nombre}</Text>
                            {/* <Text> {item.name} </Text> */}
                            {/* <Text style={{ marginLeft:60 }}> {fecha}</Text>
                            <Text style={{ marginLeft:5 }}> {hora}</Text> */}
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.deleteButton}
                        onPress={() => deleteItem()} >
                        <FontAwesomeIcon icon={faTrash} />
                    </TouchableOpacity>

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
                                {/* {!booking.calendar ? (
                                    <View>
                                        <TextInput
                                            // keyboardType="email-address"
                                            // style={styles.input}
                                            // value={email}
                                            // onChangeText={booking.}
                                            // autoCapitalize="none"
                                        />
                                    </View>
                                ) : ( */}
                                    <View>
                                        <View style={styles.row}>
                                            <Text style={styles.label}>Tipo:</Text>
                                            {/* <Text style={styles.value}>asd</Text> */}
                                        </View>
                                        <View style={styles.row}>
                                            <Text style={styles.label}>Costo:</Text>
                                            {/* <Text style={styles.value}>$ sad</Text> */}
                                        </View>
                                        <View style={styles.row}>
                                            <Text style={styles.label}>Comienza:</Text>
                                            {/* <Text style={styles.value}>{formatDate(booking.dateInit)}</Text> */}
                                        </View>
                                        <View style={styles.row}>
                                            <Text style={styles.label}>Termina:</Text>
                                            {/* <Text style={styles.value}>{formatDate(booking.dateEnd)}</Text> */}
                                        </View>
                                        <View style={styles.row}>
                                            <Text style={styles.label}>Descripción:</Text>
                                            {/* <Text style={styles.value}>{formatDate(booking.dateEnd)}</Text> */}
                                        </View>
                                    </View>
                                {/* )} */}
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
            ) : (
                null
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
    deleteButton: {
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
        justifyContent: 'space-between',
        marginBottom: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#000',

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