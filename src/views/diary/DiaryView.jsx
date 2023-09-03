import { Text, StyleSheet, View } from 'react-native';

const DiaryView = () => {

    const showSchedules = () => {
		return scedules.map((item, index) => {
			return (
				<View>
                    <Text>Line item</Text>
                </View>
			)
		});
	};

    return (
        <View style={styles.container}>
            
        </View>
    );
}

{/* <View style={styles.line}>
    <View>
        <Text>Fecha</Text>
    </View>
    <View>
        <Text>Fecha</Text>
    </View>
</View> */}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00aaff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:10,
        margin: 6,
    }
})

export default DiaryView;