import { 
	useState, 
	useEffect
} from 'react';
import { 
	Text, 
	View, 
	Alert, 
	StyleSheet, 
	Platform,
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
import {
	requestLocationPermission, 
	getLocation,
	companyLocations
} from '../../controllers/MapController';
import { useNavigation } from '@react-navigation/native';

import SearchPanel from './SearchPanel';

const HomeView = () => {

	// estado de ubicación dispositivo
	const [location, setLocation] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (await requestLocationPermission() === 'granted') {
					const region = await getLocation();
					setLocation(region);
				} else {
					alert('No tiene permisos para obtener la ubicación.');
				}
			} catch (error) {
				console.log('ERROR fetchData: '+error);
			}
		};
		fetchData();
	}, []);

	const navigation = useNavigation();

	var otherLocation = {
		latitude: -34.90477156839922,
		latitudeDelta: 0.20354241619580193,
		longitude: -56.180862206965685,
		longitudeDelta: 0.13483230024576187
	};

	const onRegionChange = (region) => {
		// esta funcion sirve para sacar las coordenadas cuando el mapa se mueve
		// console.log(region);
	};
	
	const showCompanyLocations = () => {
		return companyLocations.map((item, index) => {
			return (
				<Marker
					key={index}
					pinColor='#00ffff'
					coordinate={item.location}
					>
					<Callout 
						style={styles.callout}
						onPress={() => navigation.navigate('Realizar Reserva', { item })} >
						<Text style={styles.title}>{item.title}</Text>
						<Text style={styles.description}>{item.description}</Text>
					</Callout>
				</Marker>
			)
		});
	};

	return (
		<View style={styles.container}>

			<SearchPanel onSearch={(query) => handleSearch(query)} />

			{Platform.OS === 'android' ? (
				<MapView
					style={styles.map}
					onRegionChange={onRegionChange}
					initialRegion={location}
					zoomEnabled={true}
					zoomControlEnabled={true}
					>
						
					{showCompanyLocations()}
	
					{/* <Marker
						draggable --> esto es para arrastrar el marcador
						pinColor='#0000ff'
						coordinate={draggableMarkerCoord}
						onDragEnd={(e) => setDraggableMarkerCoord(e.nativeEvent.coordinate)}
					/> */}

					{/* <Polyline 
						coordinates={[location,companyLocations[0].location]}
						strokeColor="red"
						strokeWidth={6}
					/> */}

				</MapView>
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
		marginBottom: 65,
	},
	map: {
		width: '99%',
		height: '93%',
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
})

export default HomeView;