import { Text, StyleSheet, View } from 'react-native';

const AboutView = () => {
  return (
    <View style={styles.container}>
      <Text>Acerca de...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default AboutView;