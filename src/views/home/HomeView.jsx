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
	getLocation
} from '../../controllers/MapController';


const HomeView = () => {

	let companyLocations = [
		{
			title: 'Antel Arena',
			location: {
				"latitude": -34.863847713411204,
				"longitude": -56.15342052653432,
			},
			description: 'Lugar de Eventos'
		},
		{
			title: 'Terminal Belloni',
			location: {
				"latitude": -34.855488761673755,
				"longitude": -56.13270649686456,
			},
			description: 'Terminal de Ombibus'
		}
	];

	// estado de ubicación
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
				/>
			)
		});
	};

	// let initialRegion = {
	// 	"latitude": -34.90477156839922, 
	// 	"latitudeDelta": 0.20354241619580193, 
	// 	"longitude": -56.180862206965685, 
	// 	"longitudeDelta": 0.13483230024576187
	// }

	return (
		<View style={styles.container}>
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