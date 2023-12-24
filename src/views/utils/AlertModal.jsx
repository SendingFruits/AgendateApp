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

    showConfirmationAlert = (text) => {
        return new Promise((resolve) => {
          Alert.alert(
            'Confirmación', text,
            [
              {
                text: 'Cancelar',
                onPress: () => resolve(false),
                style: 'cancel',
              },
              {
                text: 'Aceptar',
                onPress: () => resolve(true),
              },
            ],
            { cancelable: false }
          );
        });
      };
}

export default new AlertModal();