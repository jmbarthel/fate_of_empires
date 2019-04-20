import React from 'react';
import { StyleSheet, Dimensions, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import Index from './components/index.js';
import store from './state/store.js';

export default class App extends React.Component {
	componentDidMount() {
		Expo.ScreenOrientation.allowAsync(Expo.ScreenOrientation.Orientation.LANDSCAPE);
	}

	render() {
		return (
			<Provider store={store}>
				<Index />
			</Provider>
		);
	}
}