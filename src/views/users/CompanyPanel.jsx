import { useNavigation } from '@react-navigation/native';
import { getBase64FromUri, loadImageFromBase64, getOrientation } from '../utils/Functions'

import * as ImagePicker from "expo-image-picker";

import MenuButtonItem from '../home/MenuButtonItem';
import MapController from '../../controllers/MapController';
import UsersController from '../../controllers/UsersController';
import AlertModal from '../utils/AlertModal';

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
    RefreshControl,
    Image
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const CompanyPanel = (params) => {

    const [widthMax, setWidthMax] = useState(width);
    const [heightMax, setHeightMax] = useState(height);

    var data = params.dataCompany;
    const navigation = useNavigation();

    var guid = data.guid;


    var initialContainer = {
        flex: 1,
        width: widthMax,
        height: heightMax
    };

    const [container, setContainer] = useState(initialContainer);

    var sty = StyleSheet.create({});

    sty = StyleSheet.create({
        container: {
            flex: 1,
            width: widthMax, // o '100%'
            height: heightMax, // o '100%'
            // alignItems: 'center',
            // borderRadius: 20,
        },
        header: {
            alignItems: 'center',
            marginTop: 5,
            marginHorizontal: 10,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            borderTopWidth: 2,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderColor: '#fff',
        },
        textHeader: {
            color: '#fff',
            fontWeight:'bold',
            padding: 10,
        },
        body: {
            height: height - 225,
            // marginTop: 20,
            marginHorizontal: 15,
            // borderRadius: 12,
            borderWidth: 1.2,
            borderColor: '#fff',
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
            marginVertical: 10,
            // marginHorizontal: 10,
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
            position: 'absolute',
            bottom: 0,
            left: -3,
            right: -3,
            
            flexDirection: 'row', // Ajusta la dirección del contenido según tu diseño
            justifyContent: 'center', // Ajusta la alineación horizontal según tu diseño
            alignItems: 'center', // Ajusta la alineación vertical según tu diseño
            
            marginTop: 10,
            borderWidth: 2,
            borderColor: '#fff',
        },
    });

    
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
			console.log('dataReturn: ', dataReturn);
			if (dataReturn) {
				AlertModal.showAlert('Envio Exitoso', 'Datos de la empresa Actualizados.');

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
			AlertModal.showAlert('Ocurrió un Error', error);
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

    const handleOrientationChange = () => {
        const { width, height } = Dimensions.get('window');
        setWidthMax(width);
        setHeightMax(height);

        // if (getOrientation() === 'portrait') {
        //     setContainer({
        //         flex: 1,
        //         width: widthMax,
        //         height: heightMax
        //     });
        // } else {
        //
        // }
    };

	useEffect(() => {
		// setRut(data.docu);
        // console.log(logoUrl);
        // setLogoUrl(loadImageFromBase64());

        // setSelectedPicture(loadImageFromBase64(logoUrl));
        Dimensions.addEventListener('change', handleOrientationChange);

        setTimeout(() => {
            if ((location.latitude === '' || location.latitude === 0)
             && (location.longitude === '' || location.longitude === 0)
            ) {
                alert('Tu empresa no se verá en el mapa hasta que captures tu ubicación y la guardes.');
            }
        }, 3000);

	}, [data.latitude, data.longitude]);

    return (
        <View style={sty.container}>
            <LinearGradient
                style={{flex: 1, padding: 8}}
                colors={['#dfe4ff', '#238162', '#2ECC71']} 
                >
                <View style={sty.header}>
                    <Text style={sty.textHeader}>
                        Panel de Gestión
                    </Text>
                </View>

                <View style={sty.body}>
                    <ScrollView>
        
                        <View style={sty.row}>
                            
                            <View style={sty.space}>
                            </View> 
        
                            <View style={sty.column}>
        
                                <View style={sty.btnCaptureLocation}>
                                    <MenuButtonItem 
                                        icon = {null}
                                        text = {'Captar Ubicación'}
                                        onPress={() => captureLocation()}
                                    />
                                </View>
                                
                                {/* <TouchableOpacity 
                                    style={sty.btnCaptureLocation}
                                    onPress={() => captureLocation()}
                                    >
                                    <Text style={sty.txtbtnCapture}>Captar Ubicación</Text>
                                </TouchableOpacity> */}
                                
                            </View> 
        
                            <View style={sty.column}>
                                <Text style={sty.txtCoord}>Coordenadas:</Text>
        
                                {(location !== null) ? (
                                    <View>
                                        <Text style={sty.txtLat}> Lat:{location.latitude}</Text>
                                        <Text style={sty.txtLng}> Lng:{location.longitude}</Text>
                                    </View>
                                ) : 
                                    <View>
                                        <Text style={sty.txtLat}> Lat:</Text>
                                        <Text style={sty.txtLng}> Lng:</Text>
                                        {/* {alert('No tiene una ubicación definida,'
                                            +'\npuede indicar una con el botón'
                                            +'\n"Capatar Ubicación"')} */}
                                    </View>
                                }
                            </View>
                        </View> 
        
                        <View style={sty.row}>
                            <View style={sty.column}>
                                <Text style={sty.dataLabel}>RUT:</Text>
                                <Text style={sty.dataLabel}>Propietario:</Text>
                                <Text style={sty.dataLabel}>Razón Social:</Text>
                                <Text style={sty.dataLabel}>Rubro:</Text>
                                <Text style={sty.dataLabel}>Ciudad:</Text>
                                <Text style={sty.dataLabel}>Dirección:</Text>
                            </View> 
                            <View style={sty.column}>
                                <TextInput 
                                    editable={false}
                                    keyboardType="numeric"
                                    style={sty.dataEdit} 
                                    value={rut}
                                    onChangeText={setRut}
                                    />
                                <TextInput 
                                    style={sty.dataEdit} 
                                    value={owner}
                                    onChangeText={setOwner}
                                    />
                                <TextInput 
                                    style={sty.dataEdit} 
                                    value={businessName}
                                    onChangeText={setBusinessName}
                                    />
                                <TextInput 
                                    style={sty.dataEdit} 
                                    value={category}
                                    onChangeText={setCategory}
                                    />
                                <TextInput 
                                    style={sty.dataEdit} 
                                    value={city}
                                    onChangeText={setCity}
                                    />
                                <TextInput 
                                    style={sty.dataEdit} 
                                    value={address}
                                    onChangeText={setAddress}
                                    />
                            </View>
                        </View> 
                        <View style={sty.row}>
                            <SafeAreaView>
                                <Text style={{fontWeight:'bold',paddingHorizontal:22,marginVertical:3,paddingVertical:5,}}
                                    > Descripción:</Text>
                                <TextInput 
                                    style={sty.dataEditDesc} 
                                    value={description}
                                    multiline={true}
                                    onChangeText={setDescription}
                                    />
                            </SafeAreaView>
                        </View> 
        
                        <View style={sty.row}>
                            <View style={sty.column}>
                                <Text>  </Text>
                            </View>
                            <View style={sty.column}>
                                <Text>  </Text>
                            </View>
                        </View>
        
                        <View style={sty.row}>
                            <View style={sty.column}>
                                <View style={sty.imageContainer}>
                                    <TouchableOpacity 
                                        style={sty.imageButton}
                                        onPress={ () => handleImagePicker() } > 	
                                        <View style={sty.buttonContent}>
                                            { (!selectedPicture) ? (
                                                <Text style={sty.imageText}>Logo</Text>
                                            ) : 
                                                <Image 
                                                    style={sty.image} 
                                                    source={{ uri: selectedPicture }} 
                                                    />
                                            }
                                        </View>
                                    </TouchableOpacity>
                                    
                                </View>
                            </View>
                            <View style={sty.column}>
                                <Text>Elija el logo de su Empresa </Text>
                            </View>
                        </View>
        
                        <View style={sty.row}>
                            <View style={sty.column}>
                                <Text>  </Text>
                            </View>
                            <View style={sty.column}>
                                <Text>  </Text>
                            </View>
                        </View>
        
                        <View style={sty.row}>
                            <View style={sty.column}>
                                <Text>  </Text>
                            </View>
                            <View style={sty.column}>
                                <Text>  </Text>
                            </View>
                        </View>
        
                    </ScrollView>
                </View>

                <LinearGradient
                    style={sty.footer}
                    colors={['#2ECC71', '#238162', '#dfe4ff']} >
                    <View style={{ marginTop :10}}>
                        <MenuButtonItem 
                            icon = {null}
                            text = {'Guardar'}
                            onPress={() => saveDataCompany()} />
                    </View>
                </LinearGradient>
    
            </LinearGradient>
        </View>
    );
}

export default CompanyPanel;