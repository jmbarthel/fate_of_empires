import React from 'react';
import { View, StyleSheet, Text } from "react-native";
import { connect } from 'react-redux';


const mapStateToProps = state => {
    return { ...state };
};

class NewGame1 extends React.Component {
	constructor() {
		super();
		this.state = {
		};
	}

	render() {
		return (
			<View>
				<Text>NewGame</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  
export default NewGame = connect(mapStateToProps)(NewGame1);