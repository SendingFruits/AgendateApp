import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ApiError = () => {

    const navigation = useNavigation();

    const actionButton = () => {
		console.log('Volviendo al inicio...');
		navigation.navigate('Inicio');
	};

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.message} >Error de Conexión con la API</Text>
            <Button 
                title="Reintentar" 
                onPress={() => actionButton()}
                />
        </View>
    );
}

export default ApiError;

const styles = StyleSheet.create({
	message: {
		padding: 10,
        fontSize: 18,
	},
});