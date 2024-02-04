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

// import { useNavigation } from '@react-navigation/native';

const BaseError = ( params, debug=null ) => {
    
    // console.log('params error: ', params);
    var params = {
        errorType,
        setIsConnected
    } = params;

    // const navigation = useNavigation();

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);   
            setIsConnected(true);
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
                return null;
                break;
        }
    }

    useEffect(() => {
		// console.log('Error');
	}, []); 

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} 
                        onRefresh={onRefresh} />
                    }
                >
                <View style={styles.contentContainer}>
                    {errorView(errorType)}
                    <Text>Arrastra hacia abajo para recargar</Text>
                </View>
            </ScrollView>
        </View>
    );
}

export default BaseError;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ee',
    },
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#ee2',
    },
    message: {
        padding: 10,
        fontSize: 18,
        fontWeight:'bold'
    },
});