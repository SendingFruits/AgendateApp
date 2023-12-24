import React, {useState} from 'react';

import { 
    StyleSheet, 
    RefreshControl,
    View,
    ScrollView,
    Text 
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

const BaseError = ( param, debug=null ) => {

    const navigation = useNavigation();

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
			navigation.navigate('Inicio');
		}, 2000);
	}, []);

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

    return(
        <ScrollView
            style={{ flex: 1 }}
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			} >
            <View style={{ flex: 1 }}>
                {errorView(param.errorType)}
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