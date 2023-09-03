import { 
	useState,
} from 'react';

import { 
    Dimensions,
    StyleSheet, 
    Text, 
    View,
    Button,
    TouchableOpacity,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LineItem = ({ icon, text, onPress }) => {
    return (
        <View style={styles.container}>

            <View style={styles.nro}>
                <Text>icono</Text>
            </View>

            <View style={styles.info}>
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

            <View style={styles.check}>
                
            </View>
        </View> 
    );
}

const styles = StyleSheet.create({
    container: {
        alignLineItems: 'center',
        width: windowWidth - 50,
        height: windowHeight - 600,
        backgroundColor: '#69ACDD',
        justifyContent: 'center',
        borderColor: '#ffffff',
        borderRadius: 20,
        borderWidth: 1,
    },

    header: {
        flex: 1,
        alignLineItems: 'center',
        marginVertical: 10,
    },
});

export default LineItem;