import React from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { connect } from 'react-redux';
import SupplyArea from '../game/supply_area/index.js';
import WonderArea from '../game/wonder_area/index.js';
import PlayerArea from '../game/player_area/index.js';
import Opponent from '../game/opponent/index.js';
import { Ionicons } from '@expo/vector-icons';
import Game from './game.js';

const mapStateToProps = state => {
    return { ...state };
};

class NewGame1 extends React.Component {
	constructor(props) {
		super(props);

		let enemyArr = {};

		let num_of_players = props.num_of_players;

		// SET ENEMIES
		let num_of_enemies = props.num_of_players - 1;

		for(let i = 1; i <= num_of_enemies; i++){
			enemyArr[i] = {
				id: i, 
				expanded: false,
				name: 'enemy '+i
			}
		}

		// DECK NUMBERS
		let ancient_wonders = 27, 
			modern_wonders = 23,
			natural_wonders = 20,
			peasant = 35, 
			bankers = 10, 
			scientist = 10, 
			artist = 10, 
			soldier = 5, 
			humanitarian_aid = 5, 
			infantry = 5, 
			navy = 5, 
			centralized_government = 5, 
			regions = 5;

		const setup = {
			'2': {
				ancient: 13, 
				modern: 9, 
				peasants: 10
			}, 
			'3': {
				ancient: 7, 
				modern: 3, 
				peasants: 9
			}, 
			'4': {
				ancient: 0, 
				modern: 0, 
				peasants: 8
			}, 
			'5': {
				ancient: 0, 
				modern: 0, 
				peasants: 7
			}, 
		}

		// SET THE WONDER SUPPLY
		let wonderSupplyArr = [];

		wonderSupplyArr.push({id: 'last_turn'});

		for(let i = 0; i < (modern_wonders - setup[num_of_players].modern); i++){
			wonderSupplyArr.push({
				id: Math.floor(Math.random() * 1000),
				type: 'modern_wonder'
			});
		}

		wonderSupplyArr.push({
			id: 'age_of_enlightenment'
		});

		for(let i = 0; i < (ancient_wonders - setup[num_of_players].ancient); i++){
			wonderSupplyArr.push({
				id: Math.floor(Math.random() * 1000),
				type: 'ancient_wonder'
			});
		}

		// SET THE PLAYER DECK
		let playerDeck = [], playerHand=[];

		for(let i =0; i < 10; i++){
			if(i < 5){
				playerHand.push({
					id: i, 
					expanded: false,
					name: 'peasant'
				})
			} else{
				playerDeck.push({
					id: i, 
					expanded: false,
					name: 'peasant'
				});
			}
		}

		this.state = {
			dim: false,

			player: {
				id: 0, 
				name: 'Player', 
				region: null, 
				trait: null,

				hand: playerHand, 
				deck: playerDeck,
				discard: [], 
				played_cards: [],

				centralized_government: 0,

				natural_wonders: [],
				ancient_wonders: [],
				modern_wonders: [], 

				resources: {
					gold: 0, 
					science: 0, 
					influence: 0,
				},
				capital: []
			},

			enemies: enemyArr, 
			num_of_enemies: num_of_enemies,
			num_of_players: num_of_players,

			wondersRevealed: [],
			wonderSupply: wonderSupplyArr,

			supplyRevealed: [],
			supplySupply: [],

			bankers: 10, 
			artists: 10, 
			scientists: 10,

			players_to_wonders: {
				'2': 4, 
				'3': 5, 
				'4': 6, 
				'5': 6
			}
		};

		/*
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
		// console.log(this.state.wonderSupply);
	}

	closeAllEnemies(){
		console.log('closing all enemies');
		this.setState(prevState => {
			let enemies = prevState.enemies;
			return {
				...prevState, 
				enemies: Object.keys(enemies).reduce((a, i)=>{
					let enemy = enemies[i];
					enemy.expanded = false;
					enemy.animateEntry = false;
					a[i] = enemy;
					return a;
				},{}), 
				dim: false
			}
		});
	}

	expandEnemy(enemyId, event){
		console.log('expanding enemy');
		if(event){
			event.preventDefault();
		}

		if(!this.state.enemies[enemyId].expanded){
			this.setState(prevState => {
				let enemies = prevState.enemies, 
					expanded = prevState.enemies[enemyId].expanded;
	
				Object.keys(enemies).map(id=>{ enemies[id].expanded = false; })
	
				enemies[enemyId].expanded = !expanded;
	
				let dim = Object.keys(enemies).reduce((a, i)=>{
					i = enemies[i];
					return a || i.expanded;
				}, false);
	
				return {...prevState, enemies, dim}
			});
		}
	}

	goToNextEnemy(direction, id){
		if(direction === -1){
			// swipe left - go right in the list
			if(id === this.state.num_of_enemies){
				// if we are already at the last - go to the first
				this.setState((prevState) => {
					let enemies = prevState.enemies;
					enemies[id].expanded = false;
					enemies[1].expanded = true;
					enemies[1].animateEntry = 1;

					return {
						...prevState, 
						enemies
					}
				});
			} else{
				this.setState((prevState) => {
					let enemies = prevState.enemies;
					enemies[id].expanded = false;
					enemies[id + 1].expanded = true;
					enemies[id + 1].animateEntry = 1;

					return {
						...prevState, 
						enemies
					}
				});
			}
		} else if(direction === 1){
			// swipe right - go left in the list
			if(id === 1){
				// if we are already at the first - go to the last
				this.setState((prevState) => {
					let enemies = prevState.enemies;
					enemies[id].expanded = false;
					enemies[this.state.num_of_enemies].expanded = true;
					enemies[this.state.num_of_enemies].animateEntry = -1;

					return {
						...prevState, 
						enemies
					}
				});
			} else{
				this.setState((prevState) => {
					let enemies = prevState.enemies;
					enemies[id].expanded = false;
					enemies[id - 1].expanded = true;
					enemies[id - 1].animateEntry = -1;

					return {
						...prevState, 
						enemies
					}
				});
			}
		}
	}

	render() {
		return (
			<View style={styles.container}>
				
				<View style={[styles.areasContainer, {height: '70%'}]}>
					<SupplyArea/>
					<WonderArea 
						players_to_wonders={this.state.players_to_wonders}
						wondersRevealed={this.state.wondersRevealed}
						wonderSupply={this.state.wonderSupply}
						num_of_players={this.state.num_of_players}
					/>
				</View>

				<View style={[styles.areasContainer, {height: '30%', alignItems: 'center'}]}>
					<PlayerArea player={this.state.player}/>
				</View>

				<Ionicons style={styles.goBack} name="md-arrow-back" size={32} color="black" onPress={this.props.goBack}/>

				{this.state.dim ? <TouchableWithoutFeedback onPress={this.closeAllEnemies.bind(this)}><View style={styles.overlay}/></TouchableWithoutFeedback> : null}

				<View style={this.state.dim ? [styles.opponentContainer, styles.opponentContainerExp] : styles.opponentContainer}>
					{Object.keys(this.state.enemies).map(enemyId => {
						let enemy = this.state.enemies[enemyId],
							func = !enemy.expanded ? this.expandEnemy.bind(this, enemy.id) : ()=>null,
							style = enemy.expanded ? {width: '100%'} : {}

						if(enemy.expanded){
							return (
								<View style={style} key={enemy.id}>
									<Opponent 
										expanded={enemy.expanded} 
										num_of_enemies={this.state.num_of_enemies}
										dim={this.state.dim}
										enemy={enemy}
										goToNextEnemy={this.goToNextEnemy.bind(this)}
									/>
								</View>);
						} else{
							return (
								<View style={style} key={enemy.id}>
									<TouchableOpacity onPress={func}>
										<Opponent 
											expanded={enemy.expanded} 
											num_of_enemies={this.state.num_of_enemies}
											dim={this.state.dim}
											enemy={enemy}
											goToNextEnemy={this.goToNextEnemy.bind(this)}
										/>
									</TouchableOpacity>
								</View>);
						}
					})}
				</View>
			
			</View>
		);
	}
}

const styles = StyleSheet.create({
    container: {
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
	},
	areasContainer:{
		flexDirection: 'row',
	},
	opponentContainer:{
		position: 'absolute',
		flexDirection: 'row',
		width: '80%',
		top: 0,
		justifyContent: 'center'
	},
	opponentContainerExp: {
		height: '85%',
	},
	goBack: {
		position: 'absolute', 
		top: 5, 
		left: 15,
	},
	overlay: {
		position: 'absolute',
		backgroundColor: '#000',
		width: '100%', 
		height: '100%',
		opacity: 0.7
	}
});
  
export default NewGame = connect(mapStateToProps)(NewGame1);