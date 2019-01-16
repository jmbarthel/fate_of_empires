import React from 'react';
import { View, StyleSheet, Text } from "react-native";
import { connect } from 'react-redux';


const mapStateToProps = state => {
    return { ...state };
};

class Hand1 extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>Hand</Text>
				<Text>This is your hand</Text>
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
  
export default Hand = connect(mapStateToProps)(Hand1);