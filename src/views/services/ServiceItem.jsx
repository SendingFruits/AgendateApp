import UsersController from '../../controllers/UsersController';

import { 
	useState,
} from 'react';

import { 
    Dimensions,
    StyleSheet, 
    Text, 
    View,
    Modal,
    Button,
    TouchableOpacity,
} from 'react-native';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ServiceItem = ( params ) => {
    // console.log('item params: ', params.service);
    var service = params.service;
    console.log(service);
    return (
        <View style={styles.container}>   
            <View>
                <View style={styles.header}>                
                    <Text style={styles.textHeader} ></Text>
                </View>
                <View style={styles.body}>
                    <Text style={styles.textBody} ></Text>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.textFooter} ></Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: windowWidth - 50,
        height: 60,
        // height: windowHeight - 600,
        marginHorizontal: 25,
        marginVertical: 15,
        backgroundColor: '#69ACDD',
        justifyContent: 'center',
        borderColor: '#ffffff',
        borderRadius: 12,
        borderWidth: 1,
    },

});

export default ServiceItem;