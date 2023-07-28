import { Text, StyleSheet, View } from 'react-native';

const DiaryView = () => {
    return (
        <View style={styles.container}>
            <Text>DiaryView</Text>
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

export default DiaryView;