import React from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import { connect } from 'react-redux';
import Capital from './capital.js';
import Hand from './hand.js';
import YourWonders from '../your_wonders/index.js';


const mapStateToProps = state => {
    return { ...state };
};

class PlayerArea1 extends React.Component {
	constructor() {
		super();
		this.state = {};
		/**
		 * 
		 * /* this.props.player
			Each player is an object as such: 
			{
				id: num, 
				expanded: false, 
				name: string, 
				region: id, 
				trait: id

				hand: array of cards in hand, 
				deck: array of cards in their deck,
				discard: array of cards in their discard pile, 
				played_cards: array of cards they have played this turn to be discarded at end,

				centralized_government: boolean

				natural_wonders: array of natural wonders built,
				ancient_wonders: array of ancient wonders built,
				modern_wonders: array of modern wonders built, 

				resources: {
					gold: num, 
					science: num, 
					influence: num,
				},

				capital: array of cards on the capital

			}



		*/
	}

	render() {
		return (
			<View style={[styles.container]}>
				<Hand style={styles.hand} hand={this.props.player.hand} toggleDim={this.props.toggleDim}/>
				<Capital style={styles.capital}/>
				<YourWonders style={styles.wonders}/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#abc',
        alignItems: 'center',
        justifyContent: 'center',
		width: '50%',
		flexDirection: 'row',
		width: '100%', 
		height: '100%', 
	},
	hand: {
		width: '55%'
	},
	capital: {
		width: '25%'
	},
	wonders: {
		width: '20%'
	},
	overlay: {
		position: 'absolute',
		backgroundColor: '#000',
		width: '100%', 
		height: '100%',
		opacity: 0.7
	}
});
  
export default PlayerArea = connect(mapStateToProps)(PlayerArea1);