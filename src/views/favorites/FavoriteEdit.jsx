import { Text, StyleSheet, View } from 'react-native';

const FavoriteEdit = () => {
    return (
        <View style={styles.container}>
            <Text>FavoriteEdit</Text>
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

export default FavoriteEdit;