import { 
	useState, 
	useEffect
} from 'react';

import { 
	Text, 
	View, 
	Alert, 
	StyleSheet, 
	Platform
} from 'react-native';

import 
	MapView, { Marker } 
from 'react-native-maps';

import {
	requestLocationPermission, 
	getLocation,
	companyLocations
} from '../../controllers/MapController';

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

	// const [draggableMarkerCoord, setDraggableMarkerCoord] = useState({
	// 	latitude: -34.90477156839922,
	// 	latitudeDelta: 0.20354241619580193,
	// 	longitude: -56.180862206965685,
	// 	longitudeDelta: 0.13483230024576187
	// });

	const onRegionChange = (region) => {
		// console.log(region);
	};

	const showCompanyLocations = () => {
		return companyLocations.map((item, index) => {
			return (
				<Marker
					key={index}
					coordinate={item.location}
					title={item.title}
					description={item.description}
					image={require('../../resources/images/dashboard_1.png')}
					style={{ width: 10, height: 10 }}
				/>
			)
		});
	};

	console.log(Platform.OS);

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
						draggable
						pinColor='#0000ff'
						coordinate={draggableMarkerCoord}
						onDragEnd={(e) => setDraggableMarkerCoord(e.nativeEvent.coordinate)}
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
	},
	map: {
		width: '100%',
		height: '100%',
		margin: '1%',
		padding: '1%',
		borderRadius: '3',
	}
})

export default HomeView;