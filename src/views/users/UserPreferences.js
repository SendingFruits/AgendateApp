import AsyncStorage from '@react-native-async-storage/async-storage';

import { 
	Dimensions,
} from 'react-native';

class UserPreferences {

    height = Dimensions.get('window').height;
    width = Dimensions.get('window').width;

    current_user = {
        guid:'none',
        name:'none',
        last:'none',
        user:'none',
        pass:'none',
        type:'none',
        mail:'none', 
        docu:'none',
        celu:'none',
        logo:'none', 
    };

    initPreferences = async () => {
		try {
			await AsyncStorage.setItem('dimensions', JSON.stringify({width, height}));
			await AsyncStorage.setItem('current_user', JSON.stringify(this.current_user));
		} catch (error) {
			console.error('Error al inicializar Current User:', error);
		}
	};

	viewPreferences = async () => {
		try {
			var dim = await AsyncStorage.getItem('dimensions');
			// console.log('view dimensions: ', dim);
			var item = await AsyncStorage.getItem('current_user');
			console.log('view current_user: ', item);
		} catch (error) {
			console.error('Error al mostrar Current User:', error);
		}
	};

	setPreferences = async (data) => {
		try {
			await AsyncStorage.setItem('current_user', JSON.stringify(data));
		} catch (error) {
			console.error('Error al setear Current User:', error);
		}
	};

	getPreferences = async (key) => {
		try {
			var result = await AsyncStorage.getItem(key);
			return result;
		} catch (error) {
			console.error('Error al mostrar Current User:', error);
		}
	};
}

export default new UserPreferences();