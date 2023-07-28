import { 
    Text, 
    StyleSheet, 
    View,
    Button
} from 'react-native';

const ServicesView = (params) => {

    var item = params.item;
    console.log(item);

    return (
        <View style={styles.container}>
         
            <View style={styles.header}>                
                <Text style={styles.textPopup} >{item.title}</Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.textPopup} >{item.description}</Text>
            </View>
            <View style={styles.footer}>
                <Button 
                    title="Reservar" 
                    color="#aF2000"
                    onPress={() => console.log('Detalles')} 
                    />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:200,
        height:200,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 60,
        borderRadius:20,
    },
    header: {
		flex: 1,
	},
	body: {
		flex: 1,
	},
	footer: {
		flex: 1,
	},

    textPopup: {
        color: 'black'
    }
})

export default ServicesView;