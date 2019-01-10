import React from 'react';
import { View, StyleSheet, Text } from "react-native";
import NewGame from '../new_game/index.js';
import Rules from '../rules/index.js';
import Options from '../options/index.js';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return { ...state };
};

class MainMenu1 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			newGame: false, 
			rules: false, 
			options: false,
		};
	}

	render() {
		return (
			<View style={styles.container}>
				{this.state.newGame ? <NewGame/> 
				: this.state.rules ? <Rules/> 
				: this.state.options ? <Options/> 
				: 
				<View>
					<Text onPress={() => this.setState({newGame: true})} style={styles.text}>New Game</Text>
					<Text onPress={() => this.setState({rules: true})}style={styles.text}>Rules</Text>
					<Text onPress={() => this.setState({options: true})}style={styles.text}>Options</Text>
				</View>
				}
			</View>
		);
	}
}

const styles = StyleSheet.create({
    container: {
		// flex: 1,
		flexDirection: 'row',
		backgroundColor: '#ffccaa',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%'
	},
	text: {
		color: '#ffffff',
		textAlign: 'center',
		fontSize: 20,
		height: 100,
		width: 100,
	}
});
  
export default MainMenu = connect(mapStateToProps)(MainMenu1);