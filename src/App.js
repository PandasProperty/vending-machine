import React from 'react';
import { Provider } from 'react-redux';
import VendingMachine from './containers/vending-machine';

import store from './redux';

export default function App() {
	return (
		<Provider store={store}>
			<VendingMachine />
		</Provider>
  	);
}
