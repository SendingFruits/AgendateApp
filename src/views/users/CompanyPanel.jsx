import { useNavigation } from '@react-navigation/native';
import { getBase64FromUri, loadImageFromBase64 } from '../utils/Functions'

import * as ImagePicker from "expo-image-picker";

import MenuButtonItem from '../home/MenuButtonItem';
import MapController from '../../controllers/MapController';
import UsersController from '../../controllers/UsersController';

import { 
    useState, useEffect
} from 'react';

import { 
    Dimensions,
    StyleSheet,
    View,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    Image
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

var windowWidth = Dimensions.get('window').width;
var windowHeight = Dimensions.get('window').height;

const CompanyPanel = (params) => {

    var data = params.dataCompany;
    // console.log('data: ', data);
    const navigation = useNavigation();

    // data = {
    //     id: "2",    
    //     address: "Vilardebo 4565",
    //     businessName: "Panaderia y Rotiseria.",
    //     category: "Gastronomia",
    //     city: "Montevideo",
    //     description: "Panaderia y Rotiseria donde podes realizar tu reserva de pedido y venir a retirar...",
    //     owner: "Jose",
    //     rut: "10000500123456789",
    // }

    var guid = data.guid;

    const [rut, setRut] = useState(data.rut);
    const [owner, setOwner] = useState(data.owner);
    const [businessName, setBusinessName] = useState(data.businessName);
    const [category, setCategory] = useState(data.category);
    const [address, setAddress] = useState(data.address);
    const [city, setCity] = useState(data.city);
    const [description, setDescription] = useState(data.description);
    
    const [logoBase, setLogoBase] = useState('');
    const [logoUrl, setLogoUrl] = useState(loadImageFromBase64(data.logo));
    const [selectedPicture, setSelectedPicture] = useState(null);

    const [location, setLocation] = useState({latitude:data.latitude, longitude:data.longitude});

    const captureLocation = async () => {
        try {
            if (await MapController.requestLocationPermission() === 'granted') {
                const region = await MapController.getLocation();
                console.log(region);
                setLocation(region);
            } else {
                alert('No tiene permisos para obtener la ubicación.');
            }
        } catch (error) {
            console.log('ERROR captureLocation: '+error);
        }
    };

    const saveDataCompany = async () => {
        // console.log('saveDataCompany');

        const formData = {
            guid,
			rut,
			owner,
			businessName,
			category,
			address,
			city,
			description,
            location,
            logoBase
		};

		UsersController.handleCompanyUpdate(formData)
		.then(dataReturn => {
			// console.log('dataReturn: ', dataReturn);
			if (dataReturn) {
				alert('Datos de la empresa Actualizados.');

                // setRut('');
                // setOwner('');
                // setBusinessName('');
                // setCategory('');
                // setAddress('');
                // setCity('');
                // setDescription('');
                setLogoUrl(loadImageFromBase64(dataReturn.logo));
			}
		})
		.catch(error => {
			alert(error);
		});
    };

    
    let openLogoPickerAsync = async () => {

		let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
		// console.log(permissionResult.granted);
		if (permissionResult.granted === false) {
			alert('Se requiere permisos de acceso a la camara.');
			return;
		}

		// const pickerResult = await ImagePicker.launchImageLibraryAsync()

        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            quality: 0.1, // Puedes ajustar este valor según tus necesidades (0.0 - 1.0)
        });

		// eslint-disable-next-line
		if (!pickerResult.canceled) {
            const uri = pickerResult.assets[0].uri;
            const base64 = await getBase64FromUri(uri);
            // console.log(base64);
            setLogoBase(base64);
            setSelectedPicture(uri);
		}
	}

    let openImageSavedAsync = async () => {
        const storedImageUri = await AsyncStorage.getItem(username);
        console.log(storedImageUri);
        if (storedImageUri) {
            setSelectedPicture(storedImageUri);
        }
    }


    const handleImagePicker = () => {
		openLogoPickerAsync();
	};

	useEffect(() => {
		// setRut(data.docu);
        // console.log(logoUrl);
        // setLogoUrl(loadImageFromBase64());

        setSelectedPicture(logoUrl);

        setTimeout(() => {
            if ((location.latitude === '' || location.latitude === 0)
             && (location.longitude === '' || location.longitude === 0)
            ) {
                alert('Tu empresa no se verá en el mapa hasta que captures tu ubicación y la guardes.');
            }
        }, 3000);
	}, [data.latitude, data.longitude]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>                
                <Text style={styles.textHeader} >Panel de Gestión</Text>
            </View>
            <View style={styles.body}>
                <ScrollView>
                    <View style={styles.row}>
                        
                        <View style={styles.space}>
                        </View> 

                        <View style={styles.column}>

                            <View style={styles.btnCaptureLocation}>
                                <MenuButtonItem 
                                    icon = {null}
                                    text = {'Captar Ubicación'}
                                    onPress={() => captureLocation()}
                                />
                            </View>
                            
                            {/* <TouchableOpacity 
                                style={styles.btnCaptureLocation}
                                onPress={() => captureLocation()}
                                >
                                <Text style={styles.txtbtnCapture}>Captar Ubicación</Text>
                            </TouchableOpacity> */}
                            
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
                            <Text style={styles.dataLabel}>Propietario:</Text>
                            <Text style={styles.dataLabel}>Razón Social:</Text>
                            <Text style={styles.dataLabel}>Rubro:</Text>
                            <Text style={styles.dataLabel}>Ciudad:</Text>
                            <Text style={styles.dataLabel}>Dirección:</Text>
                        </View> 
                        <View style={styles.column}>
                            <TextInput 
                                editable={false}
                                keyboardType="numeric"
                                style={styles.dataEdit} 
                                value={rut}
                                onChangeText={setRut}
                                />
                            <TextInput 
                                style={styles.dataEdit} 
                                value={owner}
                                onChangeText={setOwner}
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
                                value={city}
                                onChangeText={setCity}
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
                            <Text>  </Text>
                        </View>
                        <View style={styles.column}>
                            <Text>  </Text>
                        </View>
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
                            <Text>  </Text>
                        </View>
                        <View style={styles.column}>
                            <Text>  </Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.column}>
                            <Text>  </Text>
                        </View>
                        <View style={styles.column}>
                            <Text>  </Text>
                        </View>
                    </View>

                </ScrollView>
            </View>
            <View style={styles.footer}>
                <Text style={styles.textFooter} ></Text>
                {/* <Button 
                    title='Guardar'
                    color='#2ECC71'
                    onPress={() => saveDataCompany()}
                /> */}
                <MenuButtonItem 
                    icon = {null}
                    text = {'Guardar'}
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
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
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
    space: {
        width: 20
    },
    btnCaptureLocation: {
        marginVertical: 15,
        marginHorizontal: 10,
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
        height: windowHeight - 720,
        alignItems: 'center',
        marginTop: 10,
        marginHorizontal: 20,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        borderWidth: 2,
        borderColor: '#fff',
        backgroundColor:'#9a9'
    },
});

export default CompanyPanel;