import { 
    Text, 
    View,
    StyleSheet, 
    TouchableOpacity
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

const ServiceView = (params) => {

    // var item = params.item;
    // console.log(item);

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
         
            <View style={styles.header}>                
                <Text style={styles.textHeader} ></Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.textBody} ></Text>
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
    }
});

export default ServiceView;