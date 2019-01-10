import React from 'react';
import { View, StyleSheet } from "react-native";
import MainMenu from './main_menu/index.js';
import { connect } from 'react-redux';


const mapStateToProps = state => {
    return { ...state };
};

class Index1 extends React.Component {
	constructor() {
		super();
		this.state = {
			inGame: false,
		};
	}

	startGame(){
		this.setState({inGame: true});
	}

	render() {
		return (
			<View>
				<MainMenu inGame={this.state.inGame} startGame={this.startGame.bind(this)}/>
			</View>
		);
	}
}

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: '#ccc',
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 	},
// });
  
export default Index = connect(mapStateToProps)(Index1);