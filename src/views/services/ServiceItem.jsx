import UsersController from '../../controllers/UsersController';

import { 
	useState,
} from 'react';

import { 
    Dimensions,
    StyleSheet, 
    Text,
    TextInput,
    View,
    Modal,
    Button,
    TouchableOpacity,
} from 'react-native';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ServiceItem = (params) => {
    
    var service = params.service;
    console.log(service);

    const [isCollapsed, setIsCollapsed] = useState(true);
  
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };
  
    const editName = () => {
        console.log('editName');
    };

    const bodyStyles = isCollapsed ? styles.collapsedBody : styles.expandedBody;
    const footerStyles = isCollapsed ? styles.collapsedFooter : styles.expandedFooter;
  
    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity 
                    onPress={toggleCollapse} 
                    onLongPress={editName}
                    >
                    <View style={styles.header}>
                        <Text style={styles.textHeader}>{service.name}</Text>
                    </View>
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.btnEditCollapse}>
                    <Text style={styles.txtbtnEdit}>Editar</Text>
                </TouchableOpacity> */}
            </View>

            {!isCollapsed ? (
                <View>
                    <View style={styles.body}>
                        <TextInput
                            // keyboardType="email-address"
                            // style={styles.input}
                            // value={email}
                            // onChangeText={service.}
                            // autoCapitalize="none"
                        />
                    </View>
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.btnEdit}>
                            <Text style={styles.txtbtnEdit}>Editar</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={styles.button}>
                            <Text>Otra</Text>
                        </TouchableOpacity> */}
                    </View>
                </View>
            ) : (
                null
            )}

            
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        width: windowWidth - 50,
        marginHorizontal: 25,
        marginVertical: 15,
        justifyContent: 'center',
        borderRadius: 12,
        borderWidth: 0.8,
        padding:1.5,
    },
    header: {
        backgroundColor:'#9a9',
        paddingHorizontal: 10,
        borderTopLeftRadius:12,
        borderTopRightRadius:12,
    },
    textHeader: {
        fontWeight:'bold',
        paddingVertical:10,
    },
    body: {
        width: windowWidth - 55,
        height: 100,
        borderTopWidth: 1,
        borderTopColor: '#555',
        borderBottomWidth: 1,
        borderBottomColor: '#556',
        backgroundColor:'#a0d0e0',
        paddingHorizontal:10,
    },
    footer: {
        alignItems: 'flex-end',
        paddingVertical:6,
        
        backgroundColor:'#9a9',
        borderBottomLeftRadius:12,
        borderBottomRightRadius:12,
    },
    btnEdit: {
        backgroundColor: '#2ECC71',
        padding: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#2d9',
        marginEnd:10,
    },
    btnEditCollapse: {
        width:40,
        position:'relative',
        bottom:30,
        left:290,
        backgroundColor: '#2ECC71',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#2d9',
        marginEnd:10,
    },
    txtbtnEdit:{
        color:'#fff'
    }
});

export default ServiceItem;