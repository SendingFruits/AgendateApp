import { 
    Text, 
    StyleSheet, 
    View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import BookingsView from '../bookings/BookingsView';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ServiceView = (params) => {

    var item = params.item;
    console.log(item);

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
         
            <View style={styles.header}>                
                <Text style={styles.textHeader} >{item.title}</Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.textBody} >{item.description}</Text>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity>
                    <Text>Reservar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        width: 200,
        backgroundColor: '#2ECC71',
        alignItems: 'center',
        justifyContent: 'center',
        // borderTopLeftRadius: 20, 
        // borderTopRightRadius: 20,
    },
    header: {
        textAlign: 'center',
        width: 200,
        // backgroundColor: '#7DBC67',
        margin: 1,
    },
    body: {
        width: 200,
        // backgroundColor: '#C4D7BE',
        margin: 1,
    },
    footer: {
        width: 100,
        height: 50,
        // backgroundColor: '#72B088',
        margin: 1,
    },
    textHeader: {
        color: 'black',
        fontWeight: 'bold',
    },
    textBody: {
        color: 'black',
    },
});

export default ServiceView;