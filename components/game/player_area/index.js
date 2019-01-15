import React from 'react';
import { View, StyleSheet, Text } from "react-native";
import { connect } from 'react-redux';


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
				<Text>PlayerArea</Text>
				<Text>This is where your natural, ancient, and modern wonders will display, along with your capital.</Text>
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