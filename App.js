import Main from './src/views/home/Main';
import BaseError from './src/views/utils/BaseError';

import { StyleSheet } from 'react-native';

import React, { useState, useEffect } from 'react';

import 'react-native-gesture-handler';

const App = () => {

	const [isConnected, setIsConnected] = useState(true);
	
	useEffect(() => {
		console.log(isConnected);
		// setIsConnected(true);
	}, [isConnected]); 

	return (
		<>
			{isConnected ? <>
				<Main isConnected={isConnected} setIsConnected={setIsConnected} />
			</> : <>
				<BaseError errorType={'api'} setIsConnected={setIsConnected} />
			</> }
		</>
	);
};

export default App;

const styles = StyleSheet.create({
	main: {
		flex: 1,
		alignItems:'center',
		justifyContent:'center',
	},
});

