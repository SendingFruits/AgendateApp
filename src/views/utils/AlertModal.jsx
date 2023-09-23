import React from 'react';
import { View, Button, StyleSheet, Text, Alert } from 'react-native';

class AlertModal {
    
    showAlert = (text) => {
        Alert.alert(
            ' ', text,
            [
                // { text: 'Cancelar', style: 'cancel' },
                { text: 'Aceptar' }
                // { text: 'Aceptar', onPress: () => console.log('Aceptar presionado') }
            ],
            // { cancelable: false }
        );
    };
}

export default new AlertModal();