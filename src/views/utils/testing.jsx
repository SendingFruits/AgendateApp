// NavigationContainer - set options

import React, { useLayoutEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MyScreen = ({ route }) => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Detalles de Algo`, // ${route.params.item.title}
      headerRight: () => (
        <Button
          onPress={() => {
            // Lógica al hacer clic en el botón en el encabezado
          }}
          title="Botón"
        />
      ),
    });
  }, [navigation, route]);

  return (
    <View>
      <Text>Testing</Text> 
      {/* {route.params.item.description} */}
      {/* Contenido de la pantalla */}
    </View>
  );
};

export default MyScreen;