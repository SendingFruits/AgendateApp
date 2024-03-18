import Main from './src/views/home/Main';
import BaseError from './src/views/utils/BaseError';
import React, { useState } from 'react';

const App = () => {

	const [isConnected, setIsConnected] = useState(true);
	
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
