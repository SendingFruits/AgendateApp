import { formatDate } from '../../views/utils/Functions'; 

import UsersController from '../../controllers/UsersController';

import { useState, useEffect } from 'react';

import { 
    Dimensions,
    StyleSheet, 
    Text,
    TextInput,
    View,
    ScrollView,
    Button,
    TouchableOpacity,
    PanResponder
} from 'react-native';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ServiceItem = (params) => {
    
    var service = params.service;
    // console.log('service: ',service);

    const [isCollapsed, setIsCollapsed] = useState(true);
    const [bodyHeight, setBodyHeight] = useState(200);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };
  
    const editName = () => {
        console.log('editName');
    };

    const bodyStyles = isCollapsed ? styles.collapsedBody : styles.expandedBody;
    const footerStyles = isCollapsed ? styles.collapsedFooter : styles.expandedFooter;

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gestureState) => {
            console.log(event);
            console.log(gestureState);
            if (gestureState.dy > 0) {
                // Ajusta la altura según el desplazamiento hacia abajo
                setBodyHeight(100 + gestureState.dy); 
            }
        },
        onPanResponderRelease: () => {
            // Realiza alguna acción al soltar el dedo
            console.log('accion');
        }
    });

	useEffect(() => {
		
	}, []);
    

    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity 
                    onPress={toggleCollapse} 
                    onLongPress={editName}
                    >
                    <View style={styles.header}>
                        <Text style={styles.textHeader}>{service.name}</Text>
                    </View>
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.btnEditCollapse}>
                    <Text style={styles.txtbtnEdit}>Editar</Text>
                </TouchableOpacity> */}
            </View>

            {!isCollapsed ? (
                <View>
                    {/* <ScrollView style={styles.body}> */}
                    <ScrollView style={{ ...styles.body, height: bodyHeight }} {...panResponder.panHandlers}>
                        {!service.calendar ? (
                            <View>
                                <TextInput
                                    // keyboardType="email-address"
                                    // style={styles.input}
                                    // value={email}
                                    // onChangeText={service.}
                                    // autoCapitalize="none"
                                />
                            </View>
                        ) : (
                            <View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Tipo:</Text>
                                    <Text style={styles.value}>{service.type}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Costo:</Text>
                                    <Text style={styles.value}>$ {service.cost}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Comienza:</Text>
                                    <Text style={styles.value}>{formatDate(service.dateInit)}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Termina:</Text>
                                    <Text style={styles.value}>{formatDate(service.dateEnd)}</Text>
                                </View>
                            </View>
                        )}
                    </ScrollView>
                    <View style={styles.footer}>
                        {/* {console.log('calendar: ', service.calendar)} */}
                        {!service.calendar ? (
                            <TouchableOpacity style={styles.btnEdit}>
                                <Text style={styles.txtbtnEdit}>Editar</Text>
                            </TouchableOpacity>
                        ) : (
                            null
                        )}
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
        width: windowWidth - 50,
        marginHorizontal: 25,
        marginVertical: 15,
        justifyContent: 'center',
        borderRadius: 12,
        borderWidth: 0.8,
        padding:1.5,
    },
    header: {
        backgroundColor:'#9a9',
        paddingHorizontal: 10,
        borderTopLeftRadius:12,
        borderTopRightRadius:12,
    },
    textHeader: {
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
        backgroundColor:'#a0d0e0',
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

export default ServiceItem;