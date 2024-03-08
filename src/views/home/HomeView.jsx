import { 
    AuthContext 
} from '../../context/AuthContext';

import SearchPanel from './SearchPanel';
import RatioPanel from './RatioPanel';
import CompanyPanel from '../users/CompanyPanel';

import MapController from '../../controllers/MapController';
import AlertModal from '../utils/AlertModal';

import React, { 
	useContext, useRef, useState, useEffect
} from 'react';

import { 
	Dimensions,
	StyleSheet,
	RefreshControl,
	Text, 
	View,
	ScrollView,
	Keyboard,
	Image,
	Modal
} from 'react-native';

import MapView, { Marker, Callout } from 'react-native-maps';

import { useNavigation } from '@react-navigation/native';
import { getOrientation } from '../../views/utils/Functions'; 

import {
	faBuilding
} from '@fortawesome/free-solid-svg-icons';
 
import { 
	FontAwesomeIcon 
} from '@fortawesome/react-native-fontawesome';

import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const HomeView = ( params ) => {
	
	const { currentUser } = useContext(AuthContext);
	// console.log(params);
	var {
		coordinates,
		item,
		isConnected,
		setIsConnected,
	} = params.route.params || {};

	
	// console.log('isConnected: ', isConnected);
	// console.log('setIsConnected: ', setIsConnected);

	var countMap = 0;

	const mapRef = useRef(null);
	var userLogin = currentUser;
	
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
	const [showModal, setShowModal] = useState(false);
	const [ratio, setRatio] = useState(1);
	const [fav, setFav] = useState(null);
	
	const [favoriteCallout, setFavoriteCallout] = useState(false);


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
				})
				.catch(error => {
					// console.log(error);
					AlertModal.showAlert('API','Problemas de Conexión...');
					// alert('Problemas de Conexión...'); 
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
		var rango = 0.010;
		if (location !== null) {
			setRatio(value);
			
			if (value >= 1 && value <= 4)
				rango = 0.010; 
			else if (value >= 4 && value < 9)
				rango = 0.050; 
			else if (value >= 9 && value < 15)
				rango = 0.210; 
			else if (value >= 15)
				rango = 0.350; 
	
			var myLoc = {
				latitude: location.latitude,
				latitudeDelta: rango,
				longitude: location.longitude,
				longitudeDelta: rango
			};
			mapRef.current.animateToRegion(myLoc); 
		}

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
				// console.log(imgLogo);
				return (
					<Marker
						key={index}
						pinColor='#0af'
						coordinate={item.location}
						onPress={() => setSelectedMarker(item)}
						anchor={{ x: 0.5, y: 0.5 }} 
						>

						{imgLogo ? (
							<View>
								<Image source={{ uri: imgLogo }} style={{ width: 35, height: 35, borderWidth: 2, borderRadius: 10, borderColor:'#0af' }} />
							</View>
						) : (
							<View>
								<FontAwesomeIcon style={{ color:'#0af' }} icon={faBuilding} size={35} />
							</View>
						)}
						
						{
							userLogin.type === 'customer' ? (
								<Callout 
									style={styles.openCallout}
									onPress={() => handleReservation(userLogin, empresa)} 
									>
									<View style={{ flexDirection:'row', alignContent:'space-between', alignItems:'center' }}>
										<Text style={styles.title}>{item.title}</Text>
										{/* <FontAwesomeIcon style={{ color:'#fa0' }} icon={faStar} /> */}
									</View>
									<Text style={styles.description}>{item.description}</Text>
								</Callout>
							) : (
								<Callout style={styles.openCallout} 
									onPress={() => handleReservation(null, null)} 
									>
									<Text style={styles.title}>{item.title}</Text>  
									<Text style={styles.description}>{item.description}</Text>
									{/* <Text style={{ color:'#f00', fontSize:16, alignSelf:'center' }}>
										Debe ingresar como Cliente
									</Text> */}
								</Callout>
							)
						}

					</Marker>
				)
			});
		}	
	};

	const removeAccents = (str) => {
		const vocals = {
			'á': 'a', 
			'é': 'e', 
			'í': 'i', 
			'ó': 'o', 
			'ú': 'u',
			'Á': 'A', 
			'É': 'E', 
			'Í': 'I', 
			'Ó': 'O', 
			'Ú': 'U'
		};
	
		var normalizedStr = '';
	
		for (var i = 0; i < str.length; i++) {
			const char = str[i];
			const normalizedChar = vocals[char] || char; // Si no es una vocal con tilde, se deja igual
			normalizedStr += normalizedChar;
		}
	
		return normalizedStr;
	};


	const handleSearch = (query) => {
		try {
			if (query !== '') {

				const vocals = {
					'á': 'a', 
					'é': 'e', 
					'í': 'i', 
					'ó': 'o', 
					'ú': 'u',
					'Á': 'A', 
					'É': 'E', 
					'Í': 'I', 
					'Ó': 'O', 
					'Ú': 'U'
				};
				
				var normalizedQuery = removeAccents(query);
		
				const companiesWithoutAccents = companies.map(company => ({
					...company,
					title: removeAccents(company.title)
				}));

				// console.log(companies);
				// console.log(normalizedQuery);
				
				// const regex = new RegExp(`\\b${query.toLowerCase()}\\b`); 
				// const foundCompanyBasic = companies.find(company => regex.test(company.title.toLowerCase()));

				const foundCompany = companiesWithoutAccents.find(company => 
					company.title.toLowerCase().includes(normalizedQuery.toLowerCase()));
				// console.log(foundCompany);
				if (foundCompany !== null && foundCompany !== undefined) {		
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
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleReservation = (userLogin, item) => {
		// console.log('userLogin: ', userLogin);

		if (userLogin === null) {
			setShowModal(true);
			setTimeout(() => {
				setShowModal(false);
			}, 6000);
		} else {
			
			var idSelect;

			if (item.idCliente !== undefined && item.idCliente !== '') {
				// console.log('vengo de favorito');
				idSelect = item.idEmpresa;
			} else {
				// console.log('vengo de mapa');
				idSelect = item.id;
			}

			saveCompanyID(idSelect);

			navigation.navigate('Realizar Reserva', idSelect);
		}

	}; 

	const saveCompanyID = async (id) => {
		try {
			await clearAsyncStorageItem('selectedCompanyID');
			await AsyncStorage.setItem('selectedCompanyID', id.toString());
			var selected = await AsyncStorage.getItem('selectedCompanyID');
			// console.log('id seleccionado: ', selected);
		} catch (error) {
			alert('ERROR al intentar cargar la Empresa, ' + error);
		}
    }

	const clearAsyncStorageItem = async (key) => {
		return new Promise((resolve, reject) => {
			try {
				AsyncStorage.removeItem(key);
				// console.log(`Elemento con clave "${key}" eliminado.`);
				resolve(true);
			} catch (error) {
				// console.error(`Error al eliminar el elemento con clave "${key}" `, error);
				reject(error);
			}
		});
	};

	const favoriteTarget = (coordinates, item) => {
		if (item !== null && item !== undefined) {
			if (coordinates !== null) {
				// console.log(coordinates);
				// console.log(item);
				var empresa = item;

				var newCoord = {
					latitude: coordinates.latitude,
					longitude: coordinates.longitude,
					latitudeDelta: 0.0010,
					longitudeDelta: 0.0010,
				};

				mapRef.current.animateToRegion(newCoord); 
			
				return (
					<Marker
						// key={index}
						pinColor='#0af'
						coordinate={newCoord}
						onPress={() => {
							setSelectedMarker(item)
							setFavoriteCallout(true)
						}}
						anchor={{ x: 0.5, y: 0.5 }} 
						>
	
						<View>
							<FontAwesomeIcon style={{ 
								color:'#fa0', borderColor:'#0af', borderWidth: 1, 
								}} icon={faBuilding} size={35} />
						</View>
	
						{favoriteCallout && (
							<Callout 
								style={styles.openCallout}
								onPress={() => handleReservation(userLogin, empresa)} 
								>
								<View style={{ flexDirection:'row', alignContent:'space-between', alignItems:'center' }}>
									<Text style={styles.title}>{item.razonSocial}</Text>
									{/* <FontAwesomeIcon style={{ color:'#fa0' }} icon={faStar} /> */}
								</View>
								<Text style={styles.description}>{item.descripcionEmpresa}</Text>
							</Callout>
						)}
						
					</Marker>
				);
			}
		}
	}
	
	const clearCache = async () => {
		try {
			await AsyncStorage.clear();
			console.log('Cache cleared successfully.');
		} catch (error) {
		  	console.error('Error clearing cache:', error);
		}
	};

	useEffect(() => {
		fetchData();
		setShowModal(false);
		setFavoriteCallout(false)

		clearCache();

		// console.log('favoriteCallout: ', favoriteCallout);
		if ((coordinates !== null) && (coordinates !== undefined)) {
			setFav(coordinates);
		} 
		else {
			setFav(null);
		}
		Dimensions.addEventListener('change', handleOrientationChange);
	}, [ratio, countMap ]); // isConnected, ubicacion
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
					<CompanyPanel dataCompany={userLogin} />
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

							<Modal
								visible={showModal} 
								transparent={true}
								animationIn="slideInRight" 
								animationOut="slideOutRight"  
								// animationType="fade" 
								>
								<View style={{ paddingHorizontal:85, paddingVertical:120 }}>	
									<Text style={styles.alertNoLogin}> 
										Debe ingresar como Cliente para poder realizar reservas
									</Text>
								</View>
							</Modal>
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
						{ userLogin.type === 'customer' ? (
							favoriteTarget(coordinates, item)
						) : null }
					</MapView>
					
					<View style={orientation === 'portrait' ? styles.ratioPanelPortrait : styles.ratioPanelLandscape}>
						<RatioPanel onRatioChange={(newRatio) => handleRatioChange(newRatio)} />
					</View>	
				</View>
			)}
		</ScrollView>
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
	},

	alertNoLogin: { 
		color:'#f20', 
		fontSize:16, 
		textAlign:'center',
		backgroundColor: '#fff',
		padding: 9
	}
})

export default HomeView;