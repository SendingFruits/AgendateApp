import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ApiError = () => {

    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.message} >Error de Conexión a Internet</Text>
            <Button 
                title="Reintentar" 
                onPress={() => navigation.navigate('Inicio')}
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