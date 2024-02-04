import { useNavigation } from '@react-navigation/native';
import { getOrientation } from '../utils/Functions'; 

import ServiceItem from './ServiceItem';
import ServicesController from '../../controllers/ServicesController';

import React, { 
    useState, useEffect
} from 'react';

import { 
    Dimensions,
    StyleSheet, 
    Text, 
    View, 
    ScrollView,
    RefreshControl,
    TouchableOpacity,
    Keyboard
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

const ServicesView = ( params ) => {

    const { data } = params.route.params || {};

    const navigation = useNavigation();
    var guid = params.route.params.guid;

    const [list, setList] = useState(null);
    const [editing, setEditing] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [orientation, setOrientation] = useState(getOrientation());

    
    const handleEditItem = (item) => {
        console.log('handleEditItem', item);
    };
 
    const createItem = (guid) => {
        // console.log('create', guid);
        navigation.navigate('Crear Servicio', {isCreate, setIsCreate});
    };

    const premiumUpdate = () => {
        console.log('premiumUpdate');
    };

    const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
            setEditing(false);
            getServices();
			// navigation.navigate('Servicios');
		}, 2000);
	}, [list]);

    const handleOrientationChange = () => {
		const newOrientation = getOrientation();
		setOrientation(newOrientation);
	};

    const getServices = async () => {
        ServicesController.getServicesForCompany(guid)
        .then(serviceReturn => {
            // console.log('serviceReturn: ', serviceReturn);
            if (serviceReturn !== null) {
                setList([serviceReturn]);
            } else {
                setList([]);
            }
        })
        .catch(error => {
            alert('ERROR al intentar cargar los Servicios, ' + error);
        });
    }

    const listServices = () => {
        console.log('list: ', list); 
		if (list.length > 0) {
			return list.map((item, index) => {
				return item && (
					<ServiceItem 
                        guid={guid}
                        key={index}
                        item={item} 
                        onRefresh={onRefresh()}
                        onPress={() => handleEditItem(item)} 
                    />
				)
			});
		}
		
	};
    

    useEffect(() => {
        setEditing(false);
        setIsCreate(false);
        getServices();

        Dimensions.addEventListener('change', handleOrientationChange);

        /**
         * esto sirve para controlar el teclado:
         */
        // const keyboardDidShowListener = Keyboard.addListener(
        //     'keyboardDidShow', () => {
        //         // console.log('Teclado abierto');
        //         setEditing(true);
        //     }
        // );     
        // const keyboardDidHideListener = Keyboard.addListener(
        //     'keyboardDidHide',
        //     () => {
        //         // console.log('Teclado cerrado');
        //         setEditing(false);
        //     }
        // );

    }, [guid,isCreate]);


    return (
        <View style={styles.container}>

            {(list !== null && Array.isArray(list) && list.length > 0) ? (
                <ScrollView 
                    contentContainerStyle={styles.scrollContainer}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }>

                    {list.map((item, index) => (
                        <View key={index}>
                            <ServiceItem 
                                guid={guid}
                                key={index}
                                item={item}
                                editMode={editMode}
                                setEditMode={setEditMode}
                                navigation={navigation}
                                onRefresh={onRefresh}
                                onPress={() => handleEditItem(item)}
                                />
                            {/* <Text>{item.nombre}</Text> */}
                        </View>
                    ))}

                </ScrollView>
            ) : (
                <View style={{}}>
                    <Text>No tiene un servicio creado aún</Text>

                    <LinearGradient
                        colors={['#135054', '#a8ffff', '#fff']}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1.5 }}
                        style={styles.btnCreate}
                        >
                        <TouchableOpacity 
                            styles={{ alignContent:'center' }}
                            onPress={() => createItem(guid)} >
                            <Text> Crear Servicio </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            )}

            {!editing ? (
                <>
                    {orientation === 'portrait' ? (		
                        <>
                            {/* <View style={styles.footer}>
                                <Text style={styles.textVersion1}>
                                    En esta versión solo puede tener un servicio</Text>
                                <TouchableOpacity 
                                    onPress={() => premiumUpdate()} 
                                    style={{ alignItems:'center' }}>
                                    <Text>Necesita actualizar a la versión Premium</Text>
                                    <Text>si quiere manejar multiples servicios</Text>
                                </TouchableOpacity>
                                <View>        
                                </View>
                            </View> */}
                        </>		
                    ) : (
                        <></>
                    )}
                </>
            ) : (
                <></>
            )}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e9e9f8',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollContainer: {
        flex: 1,
        width: '100%',
    },
    btnCreate: {
		paddingVertical: 10,
		paddingHorizontal: 6,
        marginTop: 15,
		marginBottom: 15,
        marginHorizontal: 45,
		borderRadius: 10,
        textAlign:'center'
    },
    textCreate: {
        color:'#ffffff'
    },
    footer: {   
        width:'95%',
        textAlignVertical:'bottom',
        alignItems:'center',
        borderTopColor:'#011',
        borderTopWidth:0.6,
        
    },
    textVersion1: {
        fontWeight:'bold',
        paddingHorizontal:6,
        paddingVertical:10,
    },
    textVersion2: {
        paddingHorizontal:3,
        paddingBottom: 20,
    },
});

export default ServicesView;