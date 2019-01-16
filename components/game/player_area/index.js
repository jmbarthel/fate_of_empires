import React from 'react';
import { View, StyleSheet, Text } from "react-native";
import { connect } from 'react-redux';
import Capital from '../capital/index.js';
import Hand from '../hand/index.js';


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
				<Hand/>
				<Capital/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ade',
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%'
    },
});
  
export default PlayerArea = connect(mapStateToProps)(PlayerArea1);