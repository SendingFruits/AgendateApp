import React, { useState } from 'react';

import MenuAside from './src/views/home/MenuAside';

let globals = [
	{
		'current_user' : {
			'user':'admin',
			'pass':'12345',
		},
		'connection' : {
			'string':'admin',
			'pass':'12345',
		},
	}
];

const App = (globals) => {
	return (
		<MenuAside 
			currentUser = {globals['current_user']}
		/>
	);
};

export default App;