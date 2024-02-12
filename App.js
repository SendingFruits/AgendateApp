import { UserContext } from './src/services/context/context'; 

import { 
	StyleSheet, 
	Dimensions,
	Keyboard,
} from 'react-native';

import React, { 
	useState, useEffect 
} from 'react';

import BaseError from './src/views/utils/BaseError'
import Main from './src/views/home/Main';

import 'react-native-gesture-handler';
 
import { NavigationContainer, useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const App = (config) => {

	var preferences = {
		'current_user' : {
			'guid':'none',
			'name':'none',
			'last':'none',
			'user':'none',
			'pass':'none',
			'type':'none',
			'mail':'none', 
			'docu':'none',
			'celu':'none',
			'logo':'none', 
		},
		'connection' : {
			'string':'none',
		},
		'theme' : {
			'dark': 0,
			'white': 1,
		}
	}

	const [isConnected, setIsConnected] = useState(true);
	const [userPreferences, setUserPreferences] = useState(preferences);

	const [menuVisible, setMenuVisible] = useState(false);
	const [profileVisibleInit, setProfileVisibleInit] = useState(false);
	
	const [token, setToken] = useState(null);
	
	try {
		
		const setOptions = (navigation) => {
			navigation.setOptions({
				headerRight: () => (
					<BaseError
						isConnected={isConnected}
						setIsConnected={setIsConnected}
						/>
				),
			});
		};

		useEffect(() => {
			// setIsConnected(true);
		}, []); 
	
		if (isConnected) {
			return (
				<NavigationContainer 
					onStateChange={(state) => {
						if ((state.history.length > 1)) {
							for (const key in state.history) {
								if (state.history[key].type == 'drawer') {
									Keyboard.dismiss();
									setMenuVisible(true);
								} 
							}
						} else {
							setMenuVisible(false);
							setProfileVisibleInit(false);
						}
					}
				} > 
					{isConnected ? (
						<UserContext.Provider value={{ userPreferences, setUserPreferences }}>
							<Main
								style={styles.main}
								setOptions={setOptions}
								isConnected={isConnected}
								setIsConnected={setIsConnected}
								profileVisibleInit={profileVisibleInit}
								/>
						</UserContext.Provider>
					) : (
						<BaseError 
							errorType={'api'} 
							setIsConnected={setIsConnected} 
							/>
					)}
			    </NavigationContainer>
			);
		} else {
			return (
				<BaseError 
					errorType={'api'} 
					setIsConnected={setIsConnected}
					/>
			);
		}
	} catch (error) {
		console.log(error);
		return (
			<BaseError 
				errorType={error}
				setIsConnected={setIsConnected}
				/>
		);
	}
};

export default App;

const styles = StyleSheet.create({
	main: {
		flex: 1,
	},
});

