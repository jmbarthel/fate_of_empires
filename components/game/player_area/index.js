import React from 'react';
import { View, StyleSheet, Text, Image } from "react-native";
import { connect } from 'react-redux';
import Capital from './capital.js';
import Hand from './hand.js';
import YourWonders from './your_wonders.js';


const mapStateToProps = state => {
    return { ...state };
};

class PlayerArea1 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {dim: true};
		
		/* this.props.player
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
			<View style={styles.container}>
				<Hand 
					style={styles.hand} 
					hand={this.props.player.hand} 
					toggleDim={this.props.toggleDim} 
					expandHandCard={this.props.expandHandCard} 
					deck={this.props.player.deck}
					discard={this.props.player.discard}
					playerNumber={this.props.playerNumber}
				/>
				<View style={{width: '10%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
					<View><Text style={{color: '#fff'}}><Image style={{width: 23, height: 23}} source={require('../../../assets/symbols/actions/AnyMix.png')}/> {this.props.player.resources.any}</Text></View>
					<View><Text style={{color: '#fff'}}><Image style={{width: 23, height: 23}} source={require('../../../assets/symbols/actions/Gold.png')}/> {this.props.player.resources.gold}</Text></View>
					<View><Text style={{color: '#fff'}}><Image style={{width: 23, height: 23}} source={require('../../../assets/symbols/actions/Influence.png')}/> {this.props.player.resources.influence}</Text></View>
					<View><Text style={{color: '#fff'}}><Image style={{width: 23, height: 23}} source={require('../../../assets/symbols/actions/Science.png')}/> {this.props.player.resources.science}</Text></View>
				</View>
				<Capital 
					style={styles.capital}
					capital={this.props.player.capital}
					expandCapital={this.props.expandCapital}
				/>
				<YourWonders style={styles.wonders}/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
		width: '50%',
		flexDirection: 'row',
		width: '100%', 
		height: '100%', 
	},
	hand: {
		width: '50%'
	},
	capital: {
		width: '20%'
	},
	wonders: {
		width: '20%'
	},
});
  
export default PlayerArea = connect(mapStateToProps)(PlayerArea1);