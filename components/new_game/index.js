import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { connect } from 'react-redux';
import SupplyArea from '../game/supply_area/index.js';
import WonderArea from '../game/wonder_area/index.js';
import PlayerArea from '../game/player_area/index.js';
import Opponent from '../game/opponent/index.js';
import { Ionicons } from '@expo/vector-icons';
// Cards
import Peasant from '../game/cards/starters/Peasant.js';
import HumanitarianAid from '../game/cards/starters/HumanitarianAid.js';

// Setup
import assembleSupplyDeck from './assemble_supply_cards.js';
import assembleWonderDeck from './assemble_wonder_cards.js';

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
				name: 'enemy '+i,
				deck: [],
				hand: [],
				activePlayer: false,
			}
		}

		// DECK NUMBERS
		let ancientWondersCount = 27, 
			modernWondersCount = 23,
			natural_wonders = 20,
			peasant = 35, 
			bankers = 10, 
			scientist = 10, 
			artist = 10, 
			soldier = 5, 
			humanitarian_aid = 5, 
			infantry = 5, 
			centralized_government = 5, 
			regions = 5;

		
		// SET THE WONDER SUPPLY
		let { wonderSupply, naturalWonders } = assembleWonderDeck(num_of_players);
		let wondersRevealed = [];
		const players_to_wonders = {
			'2': 4, 
			'3': 5, 
			'4': 6, 
			'5': 6
		};
		for(let i = 0; i < players_to_wonders[num_of_players]; i++){
			wondersRevealed.push(wonderSupply.pop());
		}

		// SET THE PLAYERS DECKS
		let playerDeck = [], playerHand=[];

		const setupPeasants = {
			'2': 10, 
			'3': 9, 
			'4': 8, 
			'5': 7, 
		}

		// setting enemy decks
		for(let i = 0; i < Object.keys(enemyArr).length; i++){
			for(let j = 0; j < setupPeasants[num_of_players]; j++){
				enemyArr[Object.keys(enemyArr)[i]].deck.push(Peasant);
			}
			// Adding humanitarian aid
			enemyArr[Object.keys(enemyArr)[i]].deck.push(HumanitarianAid);
		}

		// Setting player deck
		for(let i = 0; i < setupPeasants[num_of_players]; i++){
			playerDeck.push(Peasant);
		}

		// Adding humanitarian aid
		playerDeck.push(HumanitarianAid);

		//SETUP PLAYER HANDS
		const setUpDraws = {
			'1': {
				draw: 5, 
				capital: []
			},
			'2': {
				draw: 5, 
				capital: 'soldier'
			},
			'3': {
				draw: 6, 
				capital: []
			},
			'4': {
				draw: 6, 
				capital: 'soldier'
			},
			'5': {
				draw: 7, 
				capital: []
			}
		}

		for(let i = 0; i < setUpDraws['1'].draw; i++){
			playerHand.push(playerDeck.pop());
		}

		let idx = 2;

		Object.keys(enemyArr).forEach(enemyId => {
			for(let i = 0; i < setUpDraws[idx].draw; i++){
				enemyArr[enemyId].hand.push(enemyArr[enemyId].deck.pop());
			}
			idx++;
		});

		//SET REVEALED SUPPLY CARDS
		const supplyDeck = assembleSupplyDeck();
		const supplyRevealed = [];

		for(let i = 0; i < 8; i++){
			supplyRevealed.push(supplyDeck.pop());
		}

		this.state = {
			dim: false,
			expandSupplyCard: false, 
			expandedSupplyCard: false,
			expandWonderCard: false, 
			expandedWonderCard: false,
			expandHandCard: false, 
			expandedHandCard: false,

			player: {
				id: 0, 
				name: 'Player', 
				region: null, 
				trait: null,

				activePlayer: true,

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
					any: 0,
					toward: {
						people: {
							gold: 0, 
							science: 0, 
							influence: 0,
							any: 0,
						}, 
						science: {
							gold: 0, 
							science: 0, 
							influence: 0,
							any: 0,
						}, 
						influence: {
							gold: 0, 
							science: 0, 
							influence: 0,
							any: 0,
						}, 
						anyWonder: {
							gold: 0, 
							science: 0, 
							influence: 0,
							any: 0,
						}, 
					}
				},
				capital: []
			},

			activeTurn: 1,

			enemies: enemyArr, 
			num_of_enemies: num_of_enemies,
			num_of_players: num_of_players,

			wondersRevealed,
			wonderSupply,

			naturalWonders,

			supplyRevealed,
			supplyDeck,

			bankers: 10, 
			artists: 10, 
			scientists: 10,

			players_to_wonders,

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
	}

	closeAllEnemies(){
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
				dim: false,
			}
		});
	}

	expandEnemy(enemyId, event){
		if(event){
			event.preventDefault();
		}

		if(!this.state.enemies[enemyId].expanded){
			this.setState(prevState => {
				let enemies = prevState.enemies, 
					expanded = prevState.enemies[enemyId].expanded;
	
				Object.keys(enemies).map(id => { enemies[id].expanded = false; })
	
				enemies[enemyId].expanded = !expanded;
	
				let dim = Object.keys(enemies).reduce((a, i)=>{
					i = enemies[i];
					return a || i.expanded;
				}, false);
	
				return {...prevState, enemies, dim}
			});
		}
	}

	toggleDim(force){
		this.setState(prevState => {
			if(force !== undefined){
				return { ...prevState, dim: force }
			} else{
				return { ...prevState, dim: !prevState.dim }
			}
		})
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

	expandSupplyCard(card){
		console.log('expanding supply', card().props.props)
		this.setState({expandSupplyCard: true, expandedSupplyCard: card()});
	}

	unExpandSupplyCard(){
		this.setState({expandSupplyCard: false, expandedSupplyCard: false});
	}

	expandWonderCard(card){
		console.log('expanding wonder', card().props.props)
		this.setState({expandWonderCard: true, expandedWonderCard: card()});
	}

	unExpandWonderCard(){
		this.setState({expandWonderCard: false, expandedWonderCard: false});
	}

	expandHandCard(card){
		console.log('expanding hand', card().props.props)
		this.setState({expandHandCard: true, expandedHandCard: card(), expandWonderCard: false, expandSupplyCard: false, expandedSupplyCard: false, expandedWonderCard: false});
	}

	unExpandHandCard(){
		this.setState({expandHandCard: false, expandedHandCard: false});
	}

	chooseOption(choice, card){
		let { choiceCount, choices } = card.props.props;

		console.log('you chose: ', choice, 'choicecount: ', choiceCount, 'options: ', choices)

		this.setState((prevState) => {
			return {
				...prevState, 
				player: {
					...prevState.player, 
					resources: {
						...prevState.player.resources, 
						any: prevState.player.resources.any + 1
					}
				}
			}
		})
	}

	buySupplyCard(card){
		let { cost } = card.props.props;
		let tempResources = { 
			gold: this.state.player.resources.gold, 
			influence: this.state.player.resources.influence, 
			science: this.state.player.resources.science, 
			any: this.state.player.resources.any 
		};

		console.log('before', tempResources);

		for(let key in cost){
			console.log('You have ', this.state.player.resources[key], key, 'and you need ', cost[key], key);

			if(tempResources[key] + tempResources.any < cost[key]){
				alert("You cannot afford this.");
				return;
			} else{
				if(tempResources[key] > cost[key]){
					tempResources[key] -= cost[key];
				} else{
					cost[key] -= tempResources[key];
					tempResources[key] -= tempResources[key];
					tempResources.any -= cost[key];
				}
			}
		}

		alert('Successfully purchased '+ card.props.props.name);
		console.log('after', tempResources);

	}

	render() {
		const Card = this.state.expandedSupplyCard;
		return (
			<View style={styles.container}>

				<View style={[styles.areasContainer, {height: '70%'}]}>
					<SupplyArea 
						supplyDeck={this.state.supplyDeck}
						supplyRevealed={this.state.supplyRevealed}
						expandSupplyCard={this.expandSupplyCard.bind(this)}
						unExpandSupplyCard={this.unExpandSupplyCard.bind(this)}
					/>
					<WonderArea 
						players_to_wonders={this.state.players_to_wonders}
						wondersRevealed={this.state.wondersRevealed}
						wonderSupply={this.state.wonderSupply}
						num_of_players={this.state.num_of_players}
						expandWonderCard={this.expandWonderCard.bind(this)}
					/>
				</View>

				<View style={[styles.areasContainer, {height: '30%', alignItems: 'center'}]}>
					<PlayerArea 
						player={this.state.player} 
						toggleDim={this.toggleDim.bind(this)}
						expandHandCard={this.expandHandCard.bind(this)}
					/>
				</View>

				{this.state.dim ? <TouchableWithoutFeedback onPress={this.closeAllEnemies.bind(this)}><View style={styles.overlay}/></TouchableWithoutFeedback> : null}
				<Ionicons style={styles.goBack} name="md-settings" size={32} color="black" onPress={this.props.goBack}/>

				<View style={this.state.dim ? [styles.opponentContainer, styles.opponentContainerExp, {width: '85%', right: null}] : styles.opponentContainer}>
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

				{this.state.expandSupplyCard ? 
						(
							<View style={{backgroundColor: '#000', position:'absolute', width: '30%', height: '85%', right: 15}}>
								{this.state.expandedSupplyCard}
								<TouchableOpacity 
									onPress={this.unExpandSupplyCard.bind(this)}
									style={{position: 'absolute', height: '70%', width: '100%', top: 0}}
								/>
								<TouchableOpacity
									style={{position: 'absolute', backgroundColor: '#F00', height: '20%', width: '50%', bottom: 0, right: 0 }}
									onPress={this.buySupplyCard.bind(this, this.state.expandedSupplyCard)}
								/>
							</View>
						) 
					: undefined}

				{this.state.expandWonderCard ? 
						(
							<View style={{backgroundColor: '#000', position:'absolute', width: '30%', height: '85%', left: 15}}>
								{this.state.expandedWonderCard}
								<TouchableOpacity 
									onPress={this.unExpandWonderCard.bind(this)}
									style={{position: 'absolute', height: '70%', width: '100%', top: 0}}
								/>
								<TouchableOpacity
									style={{position: 'absolute', height: '30%', width: '50%', bottom: 0, left: 0 }}
									// onPress={this.chooseOption.bind(this, 1, this.state.expandedHandCard)}
								/>
								<TouchableOpacity
									style={{position: 'absolute', height: '30%', width: '50%', bottom: 0, right: 0 }}
									// onPress={this.chooseOption.bind(this, 2, this.state.expandedHandCard)}
								/>
							</View>
						) 
					: undefined}

				{this.state.expandHandCard ? 
						(
							<View style={{backgroundColor: '#000', position:'absolute', width: '30%', height: '85%'}}>
								<View>
									{this.state.expandedHandCard}
									<TouchableOpacity 
										onPress={this.unExpandHandCard.bind(this)} 
										style={{position: 'absolute', height: '70%', width: '100%', top: 0}}
									/>
									<TouchableOpacity
										style={{position: 'absolute', height: '30%', width: '50%', bottom: 0, left: 0 }}
										onPress={this.chooseOption.bind(this, 1, this.state.expandedHandCard)}
									/>
									<TouchableOpacity
										style={{position: 'absolute', height: '30%', width: '50%', bottom: 0, right: 0 }}
										onPress={this.chooseOption.bind(this, 2, this.state.expandedHandCard)}
									/>
								</View>
							</View>
						) 
					: undefined}
			
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
		backgroundColor: '#075'
	},
	areasContainer:{
		flexDirection: 'row',
	},
	opponentContainer: {
		position: 'absolute',
		flexDirection: 'row',
		width: '50%',
		top: 0,
		right: 0,
		justifyContent: 'flex-end',
	},
	opponentContainerExp: {
		height: '85%',
		width: '80%',
	},
	goBack: {
		position: 'absolute', 
		top: 5, 
		left: 15,
	},
	overlay: {
		position: 'absolute',
		width: '100%', 
		height: '100%',
		opacity: 0.7
	}
});
  
export default NewGame = connect(mapStateToProps)(NewGame1);