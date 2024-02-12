import { useNavigation } from '@react-navigation/native';
import { getOrientation } from '../utils/Functions'; 

import PromoItem from './PromoItem';
import PromosController from '../../controllers/PromosController';

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


const PromosView = ( params ) => {

    const navigation = useNavigation();
    var guid = params.route.params.guid; 

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
            getPromos();
			// navigation.navigate('Servicios');
		}, 2000);
	}, []);

    const handleOrientationChange = () => {
		const newOrientation = getOrientation();
		setOrientation(newOrientation);
	};

    const getPromos = async () => {
        PromosController.getPromosForCompany(guid)
        .then(favoritesReturn => {
            // console.log('favoritesReturn: ', favoritesReturn);
            if (favoritesReturn !== null) {
                setList(favoritesReturn);
            } else {
                setList([]);
            }
        })
        .catch(error => {
            alert('ERROR al intentar cargar los Favoritos, ' + error);
        });
    }

    const listPromos = () => {
        console.log('list: ', list); 
		if (list) {
			return list.map((item, index) => {
				return item && (
					<PromoItem 
                        guid={guid}
                        key={index}
                        item={item} 
                        edit={false}
                        onRefresh={onRefresh}
                        onPress={() => handleEditItem(item)}
                        navigation={navigation}
                    />
				)
			});
		}
		
	};
    

    useEffect(() => {
        getPromos();
        // console.log(list);
    }, [guid]);


    return (
        <View style={styles.container}>
            <ScrollView 
                contentContainerStyle={styles.scrollContainer}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                {(list !== null && Array.isArray(list) && list.length > 0) ? (
                    listPromos()
                ) : null }
            </ScrollView>
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

export default PromosView;