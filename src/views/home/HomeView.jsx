import { UserContext } from '../../services/context/context'; 
import { useNavigation } from '@react-navigation/native';
import { getOrientation } from '../../views/utils/Functions'; 

import SearchPanel from './SearchPanel';
import RatioPanel from './RatioPanel';
import CompanyPanel from '../users/CompanyPanel';

import MapController from '../../controllers/MapController';


import React, { 
	useRef, useState, useEffect, useContext
} from 'react';

import { 
	Dimensions,
	StyleSheet,
	RefreshControl,
	Text, 
	View,
	ScrollView,
	TouchableOpacity,
	Keyboard,
	Image
} from 'react-native';
import 
	MapView, { 
		Marker, 
		Callout,
	} 
from 'react-native-maps';
import { 
	faBuilding
} from '@fortawesome/free-solid-svg-icons';
 
import AsyncStorage from '@react-native-async-storage/async-storage';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const { width, height } = Dimensions.get('window');

const HomeView = ( params ) => {
	
	// console.log('params home: ', params);
	var { 
		setOptions,
		isConnected,
		setIsConnected
	} = params.route.params;

	var countMap = 0;

	const mapRef = useRef(null);
	const { userPreferences, setUserPreferences } = useContext(UserContext);
	var userLogin = userPreferences.current_user;
	
	const [location, setLocation] = useState(null);
	const [companies, setCompanies] = useState([]);
	const [selectedMarker, setSelectedMarker] = useState(null);

	
	const navigation = useNavigation();

	var otherLocation = {
		latitude: -34.90477156839922,
		latitudeDelta: 0.20354241619580193,
		longitude: -56.180862206965685,
		longitudeDelta: 0.13483230024576187
	};

	const [orientation, setOrientation] = useState(getOrientation());
	const [refreshing, setRefreshing] = useState(false);
	const [ratio, setRatio] = useState(1);
	
	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
			fetchData();
			navigation.navigate('Inicio');
		}, 2000);
	}, []);

	const fetchData = async () => {
		try {
			if (await MapController.requestLocationPermission() === 'granted') {
				const region = await MapController.getLocation();
				setLocation(region);
				// const organizedCompanies = await MapController.companyLocations(region,1);
				
				MapController.companyLocations(region, ratio)
				.then(companiesReturn => {
					// console.log('hay datos: ', companiesReturn);
					setCompanies(companiesReturn);
					setIsConnected(true);

					countMap++;
					// console.log(countMap);
				})
				.catch(error => {
					// console.log('no hay datos ');
					alert('Problemas de Conexión...'); 
					setCompanies([]);
					setIsConnected(false);

					countMap = 0;
				});

			} else {
				alert('No tiene permisos para obtener la ubicación.');
			}
		} catch (error) {
			console.log('ERROR fetchData: '+error);
			if (error == -1) {
				setCompanies([]);
				setIsConnected(false);
			}
		}
	};

	const handleOrientationChange = () => {
		const newOrientation = getOrientation();
		setOrientation(newOrientation);
	};
 
	const handleRatioChange = (value) => {
		// console.log(value);
        setRatio(value);
		fetchData();
    };

	const onRegionChange = (region, gesture) => {
		// esta funcion sirve para sacar las coordenadas cuando el mapa se mueve
		// console.log(region, gesture);
	};
	
	const showCompanyLocations = () => {
		if (companies) {
			return companies.map((item, index) => {
				var imgLogo = (item.logo !== '') ? 'data:image/png;base64, '+item.logo : null;
				var empresa = item;
				// console.log(Marker);
				return (
					<Marker
						key={index}
						pinColor='#00ffff'
						coordinate={item.location}
						onPress={() => setSelectedMarker(item)}
						// icon={{uri:imgLogo}}
						>

						{/* <Image uri={imgLogo} style={{height: 35, width:35 }} /> */}

						{
							userLogin.type === 'customer' ? (
								<Callout 
									style={styles.openCallout}
									onPress={() => handleReservation(userLogin, empresa)} 
									>
									<Text style={styles.title}>{item.title}</Text>
									<Text style={styles.description}>{item.description}</Text>
								</Callout>
							) : (
								<Callout style={styles.openCallout} >
									<Text style={styles.title}>{item.title}</Text>  
									<Text style={styles.description}>{item.description}</Text>
									<Text style={{ color:'#f00', fontSize:16, alignSelf:'center' }}>
										Debe ingresar como Cliente
									</Text>
								</Callout>
							)
						}

					</Marker>
				)
			});
		}	
	};

	const handleSearch = (query) => {
		
		const regex = new RegExp(`\\b${query.toLowerCase()}\\b`); 
		// const foundCompanyBasic = companies.find(company => regex.test(company.title.toLowerCase()));
		const foundCompanyBasic = companies.find(company => company.title.toLowerCase().includes(query.toLowerCase()));
	
		console.log('query: ', query);
		MapController.searchCompany(query)
		.then(foundCompany => {
			console.log('foundCompany: ', foundCompany);
			if (foundCompany === foundCompanyBasic) {
				const newRegion = {
					latitude: foundCompany.location.latitude,
					longitude: foundCompany.location.longitude,
					latitudeDelta: 0.00006,
					longitudeDelta: 0.00006,
				};
				// Centra el mapa en la ubicación de la empresa encontrada
				mapRef.current.animateToRegion(newRegion); 
				Keyboard.dismiss();
			}
		})
		.catch(error => {
			alert(error);
		});
		
	};

	const handleReservation = (userLogin, item) => {
		console.log('userLogin: ', userLogin);
		saveCompanyID(item.id);
		navigation.navigate('Realizar Reserva', { userLogin, item })
	}; 

	const saveCompanyID = async (id) => {
		try {
			await clearAsyncStorageItem('selectedCompanyID');
			await AsyncStorage.setItem('selectedCompanyID', id.toString());
			var selected = await AsyncStorage.getItem('selectedCompanyID');
			console.log('id seleccionado: ', selected);
		} catch (error) {
			alert('ERROR al intentar cargar la Empresa, ' + error);
		}
    }

	const clearAsyncStorageItem = async (key) => {
		return new Promise((resolve, reject) => {
			try {
				AsyncStorage.removeItem(key);
				console.log(`Elemento con clave "${key}" eliminado.`);
				resolve(true);
			} catch (error) {
				console.error(`Error al eliminar el elemento con clave "${key}" `, error);
				reject(error);
			}
		});
	};

	const clearAsyncStorage = async () => {
		try {
			await AsyncStorage.clear();
			console.log('AsyncStorage limpiada correctamente.');
		} catch (error) {
		  	console.error('Error al limpiar AsyncStorage: ', error);
		}
	};

	useEffect(() => {
		// setCalloutVisible(false);
		fetchData();
		Dimensions.addEventListener('change', handleOrientationChange);
	}, [isConnected]); 
	// location - pasarle location para actualizar siempre que se geolocalice
	// companies - pasarle companies para actualizar siempre las empresas - bug

	return (
		<ScrollView contentContainerStyle={styles.container} 
			// refreshControl={
			// 	<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			// }
			>
			{userLogin.type === 'company' ? (
				<View style={styles.conrolPanel}>
					<CompanyPanel 
						dataCompany={userLogin} 
						// dataCompany={userLogin.data.company}
						// windowWidth={windowWidth} 
						// windowHeight={windowHeight}
						/>
				</View>
			) : (
				<View>
					{orientation === 'portrait' ? (
						<View style={styles.search}>
							<SearchPanel 
								onSearch={handleSearch} 
								mapRef={mapRef} 
								width={width}
								height={height}
								/>
						</View>
					) : null }

					<MapView
						ref={mapRef}
						style={ orientation === 'portrait' 
							? styles.mapPortrait : styles.mapLandscape 
						}
						onRegionChange={onRegionChange}
						initialRegion={location}
						zoomEnabled={true}
						zoomControlEnabled={true}
						showsUserLocation={true}
						showsMyLocationButton={true} 
						>
						{showCompanyLocations()}
					</MapView>
					
					<View style={orientation === 'portrait' ? styles.ratioPanelPortrait : styles.ratioPanelLandscape}>
						<RatioPanel onRatioChange={(newRatio) => handleRatioChange(newRatio)} />
					</View>	
				</View>
			)}
		</ScrollView>
	);
	
};

const CustomMarker = ( index, typeUser, item, imgLogo, imgSize ) => {
	return (
		<Marker
			key={index}
			pinColor='#00ffff'
			coordinate={item.location}
			image={{
				uri: imgLogo,
				scale: 0.01
			}} 
			>
			{typeUser === 'customer' ? (
				<Callout 
					style={{}}
					onPress={() => navigation.navigate('Realizar Reserva', { item })} 
					>
					<Text style={styles.title}>{item.title}</Text>
					<Text style={styles.description}>{item.description}</Text>
				</Callout>
			) : (
				<Callout 
					style={{}}
					>
					<Text style={styles.title}>{item.title}</Text>
					<Text style={styles.description}>{item.description}</Text>
				</Callout>
			)}
		</Marker>
	);
};

const styles = StyleSheet.create({
	search: {
		
		// alignSelf:'center',
		// marginHorizontal:50,
		// marginVertical:15,
		// width: width,

		height: 1,
		position:'absolute',
        top: -20,
        left: -50,
        right: 0,
        bottom: 0,
        zIndex: 5,
		backgroundColor:'#000'
    },
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		margin: 8,
		marginBottom: 16,
	},
	landscape: {
		marginTop:25,
	},
	viewMap: {
		width: width,
		height: height,
		alignItems: 'center',
		justifyContent: 'center',
		// backgroundColor:'#355B54',
	},
	map: {
		flex: 1,
		width: width-1,
		height: height-1,
		margin: 1,
		padding: 1,
	},
	mapPortrait: {
		flex: 1,
		width: width-1,
		height: height-1,
		margin: 1,
		padding: 1,
	},
	mapLandscape: {
		flex: 2,
		width: width-1,
		height: height-1,
		margin: 1,
		padding: 1,
	},
	modal: {
		flex: 1,
		width: 200,
		height: 200,
		backgroundColor: '#888',
	},

	openCallout: {
		width: 210,
		height: 175,
	},
	closedCallout: {
		width: 0,
		height: 0,
	},

	rowCallout: {
		flexBasis: 50,
	},

	title: {
		fontSize: 20,
		alignSelf:'center',
		marginTop: 3,
		color: '#21B081'
	},
	description: {
		flex: 1,
		width:'100%',
		alignSelf:'center',
		// marginLeft: 3,
		// marginRight: 3,
		paddingBottom: 1,
		color: '#011'
	},

	conrolPanel: {
		flex: 1,
	},
	ratioPanel: {
		position:'absolute',
		top: '90%',
    	left: '24%',
		zIndex: 2
	},
	ratioPanelPortrait: {
		position: 'absolute',
		top: '88%',
		left: '24%',
		zIndex: 2,
	},	
	ratioPanelLandscape: {
		position: 'absolute',
		top: '78%',
		left: '1%',
		zIndex: 2,
	},

	marker: {
		width: 1,
		height: 1,
	},

	row: {
		flexDirection:'row',
	}
})

export default HomeView;