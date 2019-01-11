import React from 'react';
import { View, StyleSheet, Text } from "react-native";
import { connect } from 'react-redux';
import SharedArea from '../game/shared_area/index.js';


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
			<View style={styles.container}>
				<Text>NewGame</Text>
				<SharedArea/>
				<Text onPress={this.props.goBack}>Go back</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
    container: {
			width: '100%',
			alignItems: 'center'

		},
  });
  
export default NewGame = connect(mapStateToProps)(NewGame1);