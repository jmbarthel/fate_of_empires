import React from 'react';
import { View, StyleSheet, Text } from "react-native";
import { connect } from 'react-redux';


const mapStateToProps = state => {
    return { ...state };
};

class SharedArea1 extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>SharedArea</Text>
				<Text>This is where the board is held, and items that are available for purchase can be viewed. </Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
    container: {
		backgroundColor: '#fde',
		alignItems: 'center',
		justifyContent: 'center',
		width: '50%'
    },
});
  
export default SharedArea = connect(mapStateToProps)(SharedArea1);