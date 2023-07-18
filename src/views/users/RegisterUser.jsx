import { Text, StyleSheet, View } from 'react-native';

const RegisterUser = () => {
    return (
        <View style={styles.container}>
            <Text>RegisterUser</Text>
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

export default RegisterUser;