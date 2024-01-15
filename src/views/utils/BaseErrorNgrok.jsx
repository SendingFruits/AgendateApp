import ApiConfig from '../../services/ApiConfig';

import React, {
    useState, useEffect
} from 'react';

import { 
    StyleSheet, 
    RefreshControl,
    View,
    ScrollView,
    Text,
    TextInput,
    Modal,
    Button,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

const BaseError = ( param, debug=null ) => {
    
    // console.log('nav: ', param.nav);
    // console.log('err: ', param.errorType);
    // console.log('dto: ', param.data);

    const navigation = param.nav;
    const errorType = param.errorType;

    // const [data, setData] = useState(param.data);
    const [from, setFrom] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [ngrokCode, setNgrokCode] = useState('');


    const saveNgrokCode = (code) => {
        ApiConfig.setNgrokToken(code);
        onRefresh();
    }

    const onRefresh = React.useCallback(() => {
		setRefreshing(true);
        setFrom(true);
		setTimeout(() => {
			setRefreshing(false);   
            navigation.navigate('Inicio', params={from});
		}, 2000);
	}, [navigation]);

    const errorView = (type) => {
        // console.log(type);
        switch (type) {
            case 'api':
                return (<Text style={styles.message} >Error de Conexión con la API</Text>);
                break;
            case 'debug':
                return (<Text style={styles.message} >Error: {debug}</Text>);
                break;
            case 'internet':
                return (<Text style={styles.message} >Error de Conexión a Internet</Text>);
                break;
            default:
                break;
        }
    }

    useEffect(() => {
		if (refreshing) {
            setFrom(true);
        } else {
            setFrom(false);
        }
        setShowModal(true);
	}, [ngrokCode]); 

    return(
        <ScrollView
            style={{ flex: 1 }}
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			} >
            <View style={{ flex: 1 }}>
                {errorView(errorType)}
            </View>

            {ngrokCode === '' ? (
                <Modal
                    animationType="slide"
                    visible={showModal}
                    transparent={true}
                    >
                    <View style={styles.modal}>

                        <Text>Ingrese la clave de conexion</Text>

                        <View style={styles.inputContainer}>
                            <TextInput
                                // keyboardType="text"
                                style={styles.input}
                                placeholder="Clave Ngrok"
                                value={ngrokCode}
                                onChangeText={(text) => setNgrokCode(text)}
                            />
                        </View>
                        
                        <Button
                            title="Confirmar"
                            onPress={() => {
                                saveNgrokCode(ngrokCode);
                                setShowModal(false);
                            }} />
                        
                    </View>
                </Modal>
            ) : (
                <></>
            )}
            

        </ScrollView>
    );
}

export default BaseError;

const styles = StyleSheet.create({
	message: {
        flex: 1,
		padding: 10,
        fontSize: 18,
        alignSelf:'center'
	},
    modal: {
		width: 360,
		height: 220,
		alignSelf: 'center',
		marginHorizontal: 40,
		marginVertical: 220,
		paddingHorizontal: 10,
		paddingVertical: 20,
		borderRadius: 20,
		borderColor: 'green',
		borderWidth: 1,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
	},
    input: {
		flex: 1,
		color: 'black',
		fontWeight: 'bold',
	},
    inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		borderColor: '#2ECC71',
		borderWidth: 1,
		borderRadius: 30,
		marginRight: 25,
		marginLeft: 25,
		marginBottom: 15,
		paddingHorizontal: 15,
		paddingVertical: 10,
	},
});