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
			</View>
		);
	}
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fde',
      alignItems: 'center',
      justifyContent: 'center',
      height: '90%',
      width: '90%'
    },
  });
  
export default SharedArea = connect(mapStateToProps)(SharedArea1);