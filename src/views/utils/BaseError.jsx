import React, {
    useState, useEffect
} from 'react';

import { 
    StyleSheet, 
    RefreshControl,
    View,
    ScrollView,
    Text 
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
	}, []); 

    return(
        <ScrollView
            style={{ flex: 1 }}
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			} >
            <View style={{ flex: 1 }}>
                {errorView(errorType)}
            </View>    
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
});