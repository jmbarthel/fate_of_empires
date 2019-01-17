import React from 'react';
import { View, StyleSheet, Text } from "react-native";
import { connect } from 'react-redux';
import Capital from '../capital/index.js';
import Hand from '../hand/index.js';
import YourWonders from '../your_wonders/index.js';


const mapStateToProps = state => {
    return { ...state };
};

class PlayerArea1 extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		return (
			<View style={styles.container}>
				<Hand style={styles.hand}/>
				<Capital style={styles.capital}/>
				<YourWonders style={styles.wonders}/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#abc',
        alignItems: 'center',
        justifyContent: 'center',
		width: '50%',
		flexDirection: 'row',
		width: '100%', 
		height: '100%', 
	},
	hand: {
		width: '55%'
	},
	capital: {
		width: '25%'
	},
	wonders: {
		width: '20%'
	}
});
  
export default PlayerArea = connect(mapStateToProps)(PlayerArea1);