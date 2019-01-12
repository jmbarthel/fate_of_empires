import React from 'react';
import { View, StyleSheet, Text } from "react-native";
import { connect } from 'react-redux';


const mapStateToProps = state => {
    return { ...state };
};

class OpponentArea1 extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		return (
			<View>
				<Text style={styles.container}>OpponentArea</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
    container: {
		backgroundColor: '#ade',
		margin: 10,
        // alignItems: 'center',
		// justifyContent: 'center',
    },
});
  
export default OpponentArea = connect(mapStateToProps)(OpponentArea1);