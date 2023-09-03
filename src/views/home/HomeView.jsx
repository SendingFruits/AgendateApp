import { UserContext } from '../../services/context/context'; 
import { useNavigation } from '@react-navigation/native';

import MapController from '../../controllers/MapController';

import SearchPanel from './SearchPanel';
import CompanyPanel from '../users/CompanyPanel';

import { 
	useRef,
	useState, 
	useEffect,
	useContext
} from 'react';

import { 
	Platform,
	Dimensions,
	StyleSheet, 
	Text, 
	View, 
	Alert, 
	Button,
	TouchableOpacity,
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


var windowWidth = Dimensions.get('window').width;
var windowHeight = Dimensions.get('window').height;

const HomeView = ( params ) => {

	const mapRef = useRef(null);
	const { userPreferences, setUserPreferences } = useContext(UserContext);
	var userLogin = userPreferences.current_user;
	// console.log('userLogin', userLogin);

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

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (await MapController.requestLocationPermission() === 'granted') {
					const region = await MapController.getLocation();
					setLocation(region);
					const organizedCompanies = await MapController.companyLocations();
					setCompanies(organizedCompanies);
				} else {
					alert('No tiene permisos para obtener la ubicación.');
				}
			} catch (error) {
				console.log('ERROR fetchData: '+error);
			}
		};
		fetchData();

		// algun otro estdo inicial...
	}, []);


	const onRegionChange = (region, gesture) => {
		// esta funcion sirve para sacar las coordenadas cuando el mapa se mueve
		// console.log(region, gesture);
	};
	
	const showCompanyLocations = () => {
		return companies.map((item, index) => {
			return (
				<Marker
					key={index}
					pinColor='#00ffff'
					coordinate={item.location}
					>
					{/* <Callout 
						style={styles.callout}
						onPress={() => navigation.navigate('Realizar Reserva', { item })} >
						<Text style={styles.title}>{item.title}</Text>
						<Text style={styles.description}>{item.description}</Text>
					</Callout> */}

					{userLogin.type === 'customer' ? (
						<Callout 
							style={styles.callout}
							onPress={() => navigation.navigate('Realizar Reserva', { item })} >
							<Text style={styles.title}>{item.title}</Text>
							<Text style={styles.description}>{item.description}</Text>
						</Callout>
					) : (
						<Callout 
							style={styles.callout}>
							<Text style={styles.title}>{item.title}</Text>
							<Text style={styles.description}>{item.description}</Text>
						</Callout>
					)}
				</Marker>
			)
		});
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
		}
	};

	return (
		<View style={styles.container}>
			{Platform.OS === 'android' ? (
				userLogin.type === 'company' ? (
					<View style={styles.conrolPanel}>
						<CompanyPanel 
							idCompany={userLogin.guid} 
							dataCompany={userLogin.data.company}
							// windowWidth={windowWidth} 
							// windowHeight={windowHeight}
							/>
					</View>
				) : (
					<View style={styles.viewMap}>
						<SearchPanel onSearch={handleSearch} mapRef={mapRef} />	
						<MapView
							ref={mapRef}
							style={styles.map}
							onRegionChange={onRegionChange}
							initialRegion={location}
							zoomEnabled={true}
							zoomControlEnabled={true}
							showsUserLocation={true}
							>
								
							{/* {console.log('location: ',location)} */}

							{/* <Marker 
								title="Yo" 
								coordinates={{location}}
							/> */}

							{showCompanyLocations()}

							{/* <Marker
								draggable --> esto es para arrastrar el marcador
								pinColor='#0000ff'
								coordinates={draggableMarkerCoord}
								onDragEnd={(e) => setDraggableMarkerCoord(e.nativeEvent.coordinate)}
							/> */}

							{/* <Polyline 
								coordinates={[location,companyLocations[0].location]}
								strokeColor="red"
								strokeWidth={6}
							/> */}

						</MapView>
					</View>
				)
			) : (
				<View>
					<Text>Mapa web</Text>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		margin: 8,
		marginBottom: 16,
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
	}
})

export default HomeView;