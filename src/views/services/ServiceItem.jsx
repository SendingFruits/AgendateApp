import { formatDate } from '../../views/utils/Functions'; 
import EditField from '../../views/utils/EditField'; 

import { 
    useState, useEffect 
} from 'react';

import { 
    Dimensions,
    StyleSheet, 
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Alert
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

const BookingItem = (params) => {
    
    var item = params.item;
    // console.log('item: ',item);

    // var dateString = item.FechaHoraReserva.split(' ');
    // var fecha = formatDate(dateString[0]);
    // var hora = dateString[1].slice(0, -3);

    const [isCollapsed, setIsCollapsed] = useState(true);
    const [bodyHeight, setBodyHeight] = useState(360);
    const [editMode, setEditMode] = useState(true);

   
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };
  
    const editItem = () => {
        console.log('editItem');
    };

    const editField = (field) => {
        console.log('editField ', field);


    };

    const deleteItem = () => {
        console.log('deleteItem');
        var text = '¿Seguro desea eliminar este Servicio?';

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
                        >
                        <View style={styles.textHeader}>
                            
                            <EditField 
                                icon={null} 
                                text={item.Nombre}
                                type={null}
                                onPress={() => editField(item.Nombre)}
                                />
                            
                            {/* <Text> {item.Nombre}</Text> */}
                         
                        </View>
                    </TouchableOpacity>

                    <View style={styles.buttonsRow}>
                        {/* <TouchableOpacity 
                            style={{ marginEnd:8, }}
                            onPress={() => editItem()} >
                            <FontAwesomeIcon icon={faPen} />
                        </TouchableOpacity> */}

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
                                <View>
                                    <View style={styles.row}>
                                        <Text style={styles.label}>Tipo:</Text>
                                        <EditField 
                                            icon={null} 
                                            text={item.TipoServicio}
                                            type={null}
                                            onPress={() => editField(item.TipoServicio)}
                                            />
                                        {/* <Text style={styles.value}>{item.TipoServicio}</Text> */}
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={styles.label}>Costo:</Text>
                                        <EditField 
                                            icon={null} 
                                            text={item.TipoServicio}
                                            type={null}
                                            onPress={() => editField(item.TipoServicio)}
                                            />
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={styles.label}>Comienza:</Text>
                                        <EditField 
                                            icon={null} 
                                            text={item.HoraInicio}
                                            type={'hour'}
                                            onPress={() => editField(item.HoraInicio)}
                                            />
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={styles.label}>Termina:</Text>
                                        <EditField 
                                            icon={null} 
                                            text={item.HoraFin}
                                            type={'hour'}
                                            onPress={() => editField(item.HoraFin)}
                                            />
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={styles.label}>Descripción:</Text>
                                        <EditField 
                                            icon={null} 
                                            text={item.Descripcion}
                                            type={null}
                                            onPress={() => editField(item.Descripcion)}
                                            />
                                        {/* <Text style={styles.value}>{item.Descripcion}</Text> */}
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={styles.label}>Dias:</Text>
                                        <EditField 
                                            icon={null} 
                                            text={item.DiasDefinidosSemana}
                                            type={'list'}
                                            onPress={() => editField(item.DiasDefinidosSemana)}
                                            />
                                        {/* <Text style={styles.value}>{item.DiasDefinidosSemana}</Text> */}
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
        justifyContent: 'space-between',
        marginBottom: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#000',

    },
    label: {
        width: '45%',
        fontWeight:'bold',
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