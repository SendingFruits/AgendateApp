import { UserContext } from '../../services/context/context'; 
import { useNavigation } from '@react-navigation/native';
import { getOrientation } from '../../views/utils/Functions'; 

import BaseError from '../../../src/views/utils/BaseError';
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
	Alert, 
	Button,
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
 

const HomeView = ( params ) => {
	
	const mapRef = useRef(null);
	const { userPreferences, setUserPreferences } = useContext(UserContext);
	var userLogin = userPreferences.current_user;
	
	// console.log('params', params);
	
	// estado de ubicación dispositivo
	const [location, setLocation] = useState(null);
	const [companies, setCompanies] = useState([]);
	const [calloutVisible, setCalloutVisible] = useState(false);

	// console.log(companies); 
	const navigation = useNavigation();

	var otherLocation = {
		latitude: -34.90477156839922,
		latitudeDelta: 0.20354241619580193,
		longitude: -56.180862206965685,
		longitudeDelta: 0.13483230024576187
	};

	const [orientation, setOrientation] = useState(getOrientation());
	const [isConnected, setIsConnected] = useState(true)
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
					// console.log('hay datos ');
					setCompanies(companiesReturn);
					setIsConnected(true);
				})
				.catch(error => {
					// console.log('no hay datos ');
					alert('Problemas de Conexión...'); 
					setCompanies([]);
					setIsConnected(false);
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
				// console.log(Marker);
				return (
					// <CustomMarker
					// 	index={index}
					// 	typeUser={userLogin.type}
					// 	item={item}
					// 	imgLogo={imgLogo}
					// 	imgSize={1}
					// 	/>
					
					<Marker
						key={index}
						pinColor='#00ffff'
						coordinate={item.location}
						// icon={{uri:imgLogo}}
						>

						{/* <Image uri={imgLogo} style={{height: 35, width:35 }} /> */}

						{userLogin.type === 'customer' ? (
							<Callout 
								style={styles.callout}
								onPress={() => navigation.navigate('Realizar Reserva', { userLogin, item })} 
								>
								<Text style={styles.title}>{item.title}</Text>
								<Text style={styles.description}>{item.description}</Text>
							</Callout>
						) : (
							<Callout 
								style={styles.callout}
								>
								<Text style={styles.title}>{item.title}</Text>
								<Text style={styles.description}>{item.description}</Text>
							</Callout>
						)}
					</Marker>
				)
			});
		}	
	};

	const handleSearch = (query) => {
		
		const regex = new RegExp(`\\b${query.toLowerCase()}\\b`); 
		const foundCompany = companies.find(company => regex.test(company.title.toLowerCase()));
		// const foundCompany = companies.find(company => company.title.toLowerCase().includes(query.toLowerCase()));
	
		

		if (foundCompany) {
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
	};

	useEffect(() => {
		fetchData();
		// console.log('useEffect');
		Dimensions.addEventListener('change', handleOrientationChange);
	}, [isConnected, companies]); 
	// location - pasarle location para actualizar siempre que se geolocalice
	// companies - pasarle companies para actualizar siempre las empresas

	// console.log(isConnected);
	if (!isConnected) {
		return (
			<BaseError data={companies} nav={navigation} errorType={'api'} />
		)
	} else {
		return (
			<ScrollView contentContainerStyle={styles.container} 
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}>
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
					<View style={styles.viewMap}>
						
						{orientation === 'portrait' ? (				
							<SearchPanel onSearch={handleSearch} mapRef={mapRef} />	
						) : (
							<></>
						)}

						<MapView
							ref={mapRef}
							// style={styles.map}
							style={ orientation === 'portrait' ? styles.mapPortrait : styles.mapLandscape }
							onRegionChange={onRegionChange}
							initialRegion={location}
							zoomEnabled={true}
							zoomControlEnabled={true}
							showsUserLocation={true}
						>
							{showCompanyLocations()}

						</MapView>
	
						<View style={orientation === 'portrait' ? styles.ratioPanelPortrait : styles.ratioPanelLandscape}>
							<RatioPanel 
								onRatioChange={(newRatio) => handleRatioChange(newRatio)} 
								mapRef={mapRef}
								/>
						</View>			
					
					</View>
				)}
			</ScrollView>
		);
	}
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
					style={styles.callout}
					onPress={() => navigation.navigate('Realizar Reserva', { item })} 
					>
					<Text style={styles.title}>{item.title}</Text>
					<Text style={styles.description}>{item.description}</Text>
				</Callout>
			) : (
				<Callout 
					style={styles.callout}
					>
					<Text style={styles.title}>{item.title}</Text>
					<Text style={styles.description}>{item.description}</Text>
				</Callout>
			)}
		</Marker>
	);
};

var windowWidth = Dimensions.get('window').width;
var windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
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
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor:'#355B54',
	},
	map: {
		width: '99%',
		height: '91%',
		margin: 1,
		padding: 1,
	},
	mapPortrait: {
		width: '99%',
		height: '91%',
		margin: 1,
		padding: 1,
	},
	mapLandscape: {
		width: '99%',
		height: '97%',
		margin: 1,
		padding: 1,
	},
	modal: {
		flex: 1,
		width: 200,
		height: 200,
		backgroundColor: '#888',
	},
	callout: {
		flex: 1,
		width: 160,
		height: 120,
	},
	title: {
		flex: 1,
		alignSelf:'center',
		marginTop: 3,
		padding: 2,
		color: '#21B081'
	},
	description: {
		flex: 1,
		alignSelf:'flex-start',
		marginLeft: 3,
		marginRight: 3,
		paddingBottom: 1,
		color: '#61A2DC'
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
	}
})

export default HomeView;