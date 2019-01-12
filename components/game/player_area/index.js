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
			</View>
		);
	}
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fde',
        alignItems: 'center',
        justifyContent: 'center',
        height: '10%',
        width: '10%'
    },
});
  
export default PlayerArea = connect(mapStateToProps)(PlayerArea1);