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

    const navigation = useNavigation();

    var guid = params.route.params.guid; 
    // console.log('guid: ', guid);

    const [list, setList] = useState(null);
    const [editing, setEditing] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [orientation, setOrientation] = useState(getOrientation());

    const handleEditItem = (item) => {
        console.log('handleEditItem', item);
    };
 
    const createItem = (guid) => {
        // console.log('create', guid);
        navigation.navigate('Crear Servicio');
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
	}, []);

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
        // console.log('list: ', list); 
		if (list) {
			return list.map((item, index) => {
				return item && (
					<ServiceItem 
                        guid={guid}
                        key={index}
                        item={item} 
                        edit={false}
                        onPress={() => handleEditItem(item)} 
                    />
				)
			});
		}
		
	};
    

    useEffect(() => {
        setEditing(false);
        getServices();

        Dimensions.addEventListener('change', handleOrientationChange);

        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow', () => {
                // console.log('Teclado abierto');
                setEditing(true);
            }
        );     
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                // console.log('Teclado cerrado');
                setEditing(false);
            }
        );
    }, [list,guid]);


    return (
        <View style={styles.container}>

            {/* {console.log(list)}
            {console.log(Array.isArray(list))} */}
            
            {(list !== null && Array.isArray(list) && list.length > 0) ? (
                <ScrollView 
                    contentContainerStyle={styles.scrollContainer}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }>

                    {listServices()}

                </ScrollView>
            ) : (
                <View style={styles.scrollContainer}>
                    <Text>No tiene ningún Servicio Creado</Text>

                    <LinearGradient
                        colors={['#135054', '#a8ffff', '#fff']}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1.5 }}
                        style={styles.btnCreate}
                        >
                        <TouchableOpacity onPress={() => createItem(guid)} >
                            <Text> Crear Servicio </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            )}

            {!editing ? (
                <>
                    {orientation === 'portrait' ? (				
                        <View style={styles.footer}>
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
                        </View>
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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollContainer: {
        flex: 1,
        alignItems:'center',
        width: '100%',
    },
    btnCreate: {
		paddingVertical: 10,
		paddingHorizontal: 6,
        marginTop: 15,
		marginBottom: 15,
		borderRadius: 10,
    },
    textCreate: {
        color:'#ffffff'
    },
    footer: {   
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,     
        textAlignVertical:'bottom',
        alignItems:'center',
        textAlign:'center',
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