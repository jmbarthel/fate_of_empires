import React from 'react';
import { View, StyleSheet, Text } from "react-native";
import { connect } from 'react-redux';


const mapStateToProps = state => {
    return { ...state };
};

class WonderArea1 extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>WonderArea</Text>
				<Text>This is where the wonders are held for purchase, and the deck. </Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
    container: {
		backgroundColor: '#f0e',
		alignItems: 'center',
		justifyContent: 'center',
		width: '50%'
    },
});
  
export default WonderArea = connect(mapStateToProps)(WonderArea1);