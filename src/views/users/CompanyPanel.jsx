import { useNavigation } from '@react-navigation/native';

import * as ImagePicker from "expo-image-picker";
import UsersController from '../../controllers/UsersController';

import ServiceItem from '../services/ServiceItem';
import MapController from '../../controllers/MapController';

import { 
    useState,
	useEffect
} from 'react';

import { 
    Dimensions,
    StyleSheet,
    View,
    ScrollView,
    Text, 
    TextInput,
    Button,
    TouchableOpacity,
    Alert,
    SafeAreaView,
} from 'react-native';


var windowWidth = Dimensions.get('window').width;
var windowHeight = Dimensions.get('window').height;

const CompanyPanel = (params) => {

    var data = params.dataCompany;
    // console.log('data: ', data);
    const navigation = useNavigation();

    // {
    //     "address": "Vilardebo 4565",
    //     "businessName": "Panaderia y Rotiseria.",
    //     "category": "Gastronomia",
    //     "city": "Montevideo",
    //     "description": "Panaderia y Rotiseria donde podes realizar tu reserva de pedido y venir a retirar...",
    //     "docu": "10000500123456789",
    //     "owner": "Jose",
    //     "rut": "10000500123456789",
    // }

    const [rut, setRut] = useState(data.rut);
    const [owner, setOwner] = useState(data.owner);
    const [businessName, setBusinessName] = useState(data.businessName);
    const [category, setCategory] = useState(data.category);
    const [address, setAddress] = useState(data.address);
    const [city, setCity] = useState(data.city);
    const [description, setDescription] = useState(data.description);

    const [location, setLocation] = useState({latitude:data.latitude, longitude:data.longitude});

    const captureLocation = async () => {
        try {
            if (await MapController.requestLocationPermission() === 'granted') {
                const region = await MapController.getLocation();
                setLocation(region);
            } else {
                alert('No tiene permisos para obtener la ubicación.');
            }
        } catch (error) {
            console.log('ERROR captureLocation: '+error);
        }
    };

    const saveDataCompany = async () => {
        console.log('saveDataCompany');

        
    };

    const [selectedPicture, setSelectedPicture] = useState(null);
    // convertImageToBase64(url)
    let openImagePickerAsync = async () => {

		let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
		// console.log(permissionResult.granted);
		if (permissionResult.granted === false) {
			alert('Se requiere permisos de acceso a la camara.');
			return;
		}

		const pickerResult = await ImagePicker.launchImageLibraryAsync()
		// eslint-disable-next-line
		if (!pickerResult.canceled) {
			const newSelectedImage = pickerResult.assets[0].uri;
			console.log(newSelectedImage);
            setSelectedPicture(newSelectedImage);
		}
	}

    const handleImagePicker = () => {
		openImagePickerAsync();
	};

	useEffect(() => {
		// setRut(data.docu);
	}, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>                
                <Text style={styles.textHeader} >Panel de Gestión</Text>
            </View>
            <View style={styles.body}>    
                <ScrollView>
                    <View style={styles.row}>
                        <View style={styles.column}>
                            <TouchableOpacity 
                                style={styles.btnCaptureLocation}
                                onPress={() => captureLocation()}
                                >
                                <Text style={styles.txtbtnCapture}>Captar Ubicación</Text>
                            </TouchableOpacity>
                        </View> 
                        <View style={styles.column}>
                            <Text style={styles.txtCoord}>Coordenadas:</Text>

                            {(location !== null) ? (
                                <View>
                                    <Text style={styles.txtLat}> Lat:{location.latitude}</Text>
                                    <Text style={styles.txtLng}> Lng:{location.longitude}</Text>
                                </View>
                            ) : 
                                <View>
                                    <Text style={styles.txtLat}> Lat:</Text>
                                    <Text style={styles.txtLng}> Lng:</Text>
                                    {/* {alert('No tiene una ubicación definida,'
                                        +'\npuede indicar una con el botón'
                                        +'\n"Capatar Ubicación"')} */}
                                </View>
                            }
                        </View>
                    </View> 
                    <View style={styles.row}>
                        <View style={styles.column}>
                            <Text style={styles.dataLabel}>RUT:</Text>
                            <Text style={styles.dataLabel}>Razón Social:</Text>
                            <Text style={styles.dataLabel}>Rubro:</Text>
                            <Text style={styles.dataLabel}>Dirección:</Text>
                        </View> 
                        <View style={styles.column}>
                            <TextInput 
                                keyboardType="numeric"
                                style={styles.dataEdit} 
                                value={rut}
                                onChangeText={setRut}
                                />
                            <TextInput 
                                style={styles.dataEdit} 
                                value={businessName}
                                onChangeText={setBusinessName}
                                />
                            <TextInput 
                                style={styles.dataEdit} 
                                value={category}
                                onChangeText={setCategory}
                                />
                            <TextInput 
                                style={styles.dataEdit} 
                                value={address}
                                onChangeText={setAddress}
                                />
                        </View>
                    </View> 
                    <View style={styles.row}>
                        <SafeAreaView>
                            <Text style={{fontWeight:'bold',paddingHorizontal:22,marginVertical:3,paddingVertical:5,}}
                                > Descripción:</Text>
                            <TextInput 
                                style={styles.dataEditDesc} 
                                value={description}
                                multiline={true}
                                onChangeText={setDescription}
                                />
                        </SafeAreaView>
                    </View> 
                    <View style={styles.row}>
                        <View style={styles.column}>
                            <View style={styles.imageContainer}>
                                <TouchableOpacity 
                                    style={styles.imageButton}
                                    onPress={ () => handleImagePicker() } > 	
                                    <View style={styles.buttonContent}>
                                        { (!selectedPicture) ? (
                                            <Text style={styles.imageText}>Logo</Text>
                                        ) : 
                                            <Image 
                                                style={styles.image} 
                                                source={{ uri: selectedPicture }} 
                                                />
                                        }
                                    </View>
                                </TouchableOpacity>
                                
                            </View>
                        </View>
                        <View style={styles.column}>
                            <Text>Elija el logo de su Empresa </Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.column}>
                            <Text>... </Text>
                        </View>
                        <View style={styles.column}>
                            <Text>... </Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.column}>
                            <Text>... </Text>
                        </View>
                        <View style={styles.column}>
                            <Text>... </Text>
                        </View>
                    </View>

                </ScrollView>
            </View>
            <View style={styles.footer}>
                <Text style={styles.textFooter} ></Text>
                <Button 
                    title='Guardar'
                    color='#2ECC71'
                    onPress={() => saveDataCompany()}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: windowWidth - 20,
        backgroundColor: '#a0d0e0',
        borderRadius: 20,
    },
    header: {
        width: windowWidth - 50,
        alignItems: 'center',
        marginTop: 20,
        marginHorizontal: 20,
        borderRadius: 20,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#fff',
        backgroundColor:'#9a9'
    },
    textHeader: {
        color: '#fff',
        fontWeight:'bold',
        padding: 10,
    },
    body: {
        width: windowWidth - 50,
        height: windowHeight - 300,
        marginTop: 20,
        marginHorizontal: 20,
        borderRadius: 20,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#fff',
        backgroundColor:'#9a9'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Distribuir en dos columnas
        alignItems: 'center', // Alinear verticalmente al centro
        paddingHorizontal: 1, // Espacio horizontal
        borderBottomWidth:1,
        borderBottomColor: '#fff'
    },
    column: {
        flex: 1, // Ocupar espacio igual en ambas columnas
        paddingHorizontal: 5, // Espacio horizontal entre columnas
    },
    btnCaptureLocation: {
        width:130,
        backgroundColor: '#2ECC71',
        padding: 10,
        marginVertical: 15,
        marginHorizontal: 15,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#2d9',
        alignItems:'center',
    },
    txtbtnCapture: {
        color: '#fff',
    },
    txtCoord: {
        fontSize:13,
        fontWeight: 'bold',
    },
    txtLat: {
        fontSize:11,
    },
    txtLng: {
        fontSize:11,
    },
    dataLabel: {
        fontWeight:'bold',
        paddingHorizontal:20,
        marginVertical:3,
        paddingVertical:5,
    },
    dataEdit: {
        marginVertical:3,
        marginRight:15,
        backgroundColor:'#fff',
    },
    dataEditDesc: {
        width:297,
        height:120,
        marginVertical:3,
        marginBottom:10,
        marginHorizontal:20,
        backgroundColor:'#fff',
        textAlignVertical: 'top',
      
    },
    imageContainer: {
		height: 75,
		width: 90,
		margin: 20,
		alignSelf: 'center',
		borderRadius: 20,
		backgroundColor: '#fff',
		alignItems: 'center', // Centrar horizontalmente
		justifyContent: 'center', // Centrar verticalmente
	},
    imageButton: {
        alignItems:'center'
	},
    imageText: {
		marginHorizontal:20,
	},
	image: {
		flex: 1,
		height: 75,
		width: 90,
		borderRadius: 20,
        resizeMode: 'cover',
	},
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    footer: {
        width: windowWidth - 50,
        height: windowHeight - 730,
        alignItems: 'center',
        marginTop: 20,
        marginHorizontal: 20,
        borderRadius: 20,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#fff',
        backgroundColor:'#9a9'
    },
});

export default CompanyPanel;