import { 
    Text, 
    View,
    StyleSheet, 
    TouchableOpacity,
    Dimensions
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

const ServiceView = (params) => {

    // var item = params.item;
    // console.log(item);

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.header}>                
                <Text style={styles.textHeader} >Panel de Empresa</Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.textBody} ></Text>
            </View>
            
        </View>
    );
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        width: windowWidth - 20,
        flex: 1,
        alignItems: 'center',
        width:'100%',
        backgroundColor: '#2ECC71',
        borderRadius: 20,
    },
    header: {
        width: windowWidth - 50,
        alignItems: 'center',
        marginTop: 20,
        marginHorizontal: 20,
        borderRadius: 20,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#fff'
    },
    textHeader: {
        color: '#fff',
        fontWeight:'bold',
        padding: 10,
    }
});

export default ServiceView;