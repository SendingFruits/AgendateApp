import React from 'react';
import { View, Text, Button } from 'react-native';

const ApiError = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Error de Conexión</Text>
            <Button title="Reintentar" onPress={onRetry} />
        </View>
    );
}

export default ApiError;