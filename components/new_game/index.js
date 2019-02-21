import React from 'react';
import { Image, Dimensions, View, StyleSheet, Animated, TouchableOpacity, TouchableWithoutFeedback, Text } from "react-native";
import { LinearGradient } from 'expo';
import { connect } from 'react-redux';
import SupplyArea from '../game/supply_area/index.js';
import WonderArea from '../game/wonder_area/index.js';
import PlayerArea from '../game/player_area/index.js';
import Opponent from '../game/opponent/index.js';
import { Ionicons } from '@expo/vector-icons';

import { changeTurn } from "../../actions/index.js";

// Cards
import Peasant from '../game/cards/starters/Peasant.js';
import HumanitarianAid from '../game/cards/starters/HumanitarianAid.js';

// Setup
import assembleSupplyDeck from './assemble_supply_cards.js';
import assembleWonderDeck from './assemble_wonder_cards.js';

import { shuffle } from './utilities.js';

const mapStateToProps = state => {
    return { 
		turn: state.turn
	};
};

const mapDispatchToProps = dispatch => {
	return {
		changeTurn: turn => dispatch(changeTurn(turn)),
	};
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
			enemyArr[Object.keys(enemyArr)[i]].deck = shuffle(enemyArr[Object.keys(enemyArr)[i]].deck);
		}

		// Setting player deck
		for(let i = 0; i < setupPeasants[num_of_players]; i++){
			playerDeck.push(Peasant);
		}

		// Adding humanitarian aid
		playerDeck.push(HumanitarianAid);
		// playerDeck.push(Calculus);
		// playerDeck.push(Calculus);
		// playerDeck.push(Calculus);
		// playerDeck.push(Calculus);
		// playerDeck.push(Calculus);

		playerDeck = shuffle(playerDeck);

		// Setup player hands
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

		// Set revealed supply cards
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
						person: {
							gold: 0, 
							science: 0, 
							influence: 0,
							any: 0,
						}, 
						technology: {
							gold: 0, 
							science: 0, 
							influence: 0,
							any: 0,
						}, 
						city: {
							gold: 0, 
							science: 0, 
							influence: 0,
							any: 0,
						}, 
						A_M_wonders: {
							gold: 0, 
							science: 0, 
							influence: 0,
							any: 0,
						}, 
						N_wonders: {
							gold: 0, 
							science: 0, 
							influence: 0,
							any: 0,
						}, 
						allWonders: {
							gold: 0, 
							science: 0, 
							influence: 0,
							any: 0,
						}, 
					}
				},
				capital: {
					workers: [], 
					armies: [],
				}
			},

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

		this.sidebarAnimation = new Animated.ValueXY({ x: -250, y: 0 });

	}

	_toggleSideBar(off){
		if(off){
			if(this.state.sidebar === true){
				Animated.spring(this.sidebarAnimation, {
					toValue: { x: -250, y: 0 },
					friction: 10,
				}).start();
			}
			this.setState({
				sidebar: false, 	
			});

		}
		if(this.state.sidebar){
			this.setState({
				sidebar: false,
				expandHandCard: false,
				expandedHandCard: false,
				expandSupplyCard: false,
				expandedSupplyCard: false,
				expandWonderCard: false,
				expandedWonderCard: false,
			});
			Animated.spring(this.sidebarAnimation, {
				toValue: { x: -250, y: 0 },
				friction: 10,
			}).start();
		} else{
			this.setState({
				sidebar: true,
				expandHandCard: false,
				expandedHandCard: false,
				expandSupplyCard: false,
				expandedSupplyCard: false,
				expandWonderCard: false,
				expandedWonderCard: false,
			})
			Animated.spring(this.sidebarAnimation, {
				toValue: { x: 0, y: 0 },
				friction: 10,
			}).start();
		}
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
		console.log('expanding supply', card.props.props)
		if(this.state.expandedSupplyCard && this.state.expandedSupplyCard.props.props.name === card.props.props.name){
			this.unExpandSupplyCard();
		} else{
			this.setState({expandSupplyCard: true, expandedSupplyCard: card});
		}
	}

	unExpandSupplyCard(){
		this.setState({expandSupplyCard: false, expandedSupplyCard: false});
	}

	expandWonderCard(card){
		console.log('expanding wonder', card.props.props)
		if(this.state.expandedWonderCard && this.state.expandedWonderCard.props.props.name === card.props.props.name){
			this.unExpandWonderCard();
		} else{
			this.setState({expandWonderCard: true, expandedWonderCard: card});
		}
	}

	unExpandWonderCard(){
		this.setState({expandWonderCard: false, expandedWonderCard: false});
	}

	expandHandCard(card){
		console.log('expanding hand', card.props.props)
		this.setState({expandHandCard: true, expandedHandCard: card, expandWonderCard: false, expandSupplyCard: false, expandedSupplyCard: false, expandedWonderCard: false});
	}

	unExpandHandCard(){
		this.setState({expandHandCard: false, expandedHandCard: false});
	}

	chooseOption(choice, card){
		let { choiceCount, choices } = card.props.props;

		console.log('you chose: ', choice, 'choicecount: ', choiceCount);

		if(choiceCount === 1){
			choice = 1;
		}
		
		let chosenOption = choices[choice];

		console.log(chosenOption);

		this.setState((prevState) => {
			let played_cards = prevState.player.played_cards.concat(prevState.player.hand.splice(card.props.props.num, 1));

			let resources = {
				any: prevState.player.resources.any,
				gold: prevState.player.resources.gold,
				science: prevState.player.resources.science,
				influence: prevState.player.resources.influence,
				toward: {
					A_M_wonders: prevState.player.resources.A_M_wonders,
					N_wonders: prevState.player.resources.N_wonders,
					allWonders: prevState.player.resources.allWonders,
				}
			};

			for(let type in chosenOption){

				if(type === 'produceResource'){

					for(let resource in chosenOption[type]){

						if((['any', 'gold', 'influence', 'science']).indexOf(resource) > -1){
							console.log('adding: ', resource);
							resources[resource] = resources[resource] + chosenOption[type][resource];
						}

						if(resource === 'toward'){
							console.log('produce resource toward something')
							//'[A_M_wonders, N_wonders, allWonders]'
							
						}

						if(resource === 'eachWorkerOnCapital'){
							console.log('produce resource per worker on capital')
							resources['any'] = resources['any'] + (prevState.player.capital.workers.length);
						}

						//eachPersonInHand

						//eachTechInHand

						//eachWorkerInHand

						//eachCityInHand
					}
				}

				if(type === 'produceResourceCondition'){
					console.log('produceresourcecondition');
					// inHand: {
                        // person: {
                            // gold: 1
                        // }
                    // }

					// produceResourceCondition: {
					// 	inHand: {
					// 		city: {
					// 			gold: 4
					// 		}
					// 	}
					// }

					// produceResourceCondition: {
					// 	onCapital: {
					// 		scientist: {
					// 			science: 2
					// 		}
					// 	}
					// }
				}
			}

			return {
				...prevState, 
				expandHandCard: false, 
				expandedHandCard: false,
				player: {
					...prevState.player, 
					hand: prevState.player.hand,
					played_cards,
					resources
				}
			}
		})
	}

	buySupplyCard(card){
		let { cost } = card.props.props;

		let yourResources = { 
			gold: this.state.player.resources.gold, 
			influence: this.state.player.resources.influence, 
			science: this.state.player.resources.science, 
			any: this.state.player.resources.any 
		};

		console.log('you have', yourResources, 'and you need', cost);

		if(cost.gold > 0){
			if(yourResources.gold < cost.gold){
				if(yourResources.any + yourResources.gold < cost.gold){
					alert('1You cannot afford '+card.props.props.name);
					return;
				} else{
					cost.gold -= yourResources.gold;
					yourResources.gold -= yourResources.gold;
					yourResources.any -= cost.gold;
					cost.gold = 0;
				}
			} else{
				yourResources.gold -= cost.gold;
			}
		}

		if(cost.influence > 0){
			if(yourResources.influence < cost.influence){
				if(yourResources.any + yourResources.influence < cost.influence){
					alert('2You cannot afford '+card.props.props.name);
					return;
				} else{
					cost.influence -= yourResources.influence;
					yourResources.influence -= yourResources.influence;
					yourResources.any -= cost.influence;
					cost.influence = 0;
				}
			} else{
				yourResources.gold -= cost.gold;
			}
		}

		if(cost.science > 0){
			if(yourResources.science < cost.science){
				if(yourResources.any + yourResources.science < cost.science){
					alert('3You cannot afford '+card.props.props.name);
					return;
				} else{
					cost.science -= yourResources.science;
					yourResources.science -= yourResources.science;
					yourResources.any -= cost.science;
					cost.science = 0;
				}
			} else{
				yourResources.science -= cost.science;
			}
		}

		if(cost.any > 0){
			if(yourResources.gold + yourResources.influence + yourResources.science + yourResources.any < cost.any){
				alert('4You cannot afford '+card.props.props.name);
				return;
			}

			for(let key in yourResources){
				if(yourResources[key] > 0){
					if(yourResources[key] >= cost.any){
						yourResources[key] -= cost.any;
						cost.any = 0;
					} else{
						cost.any -= yourResources[key];
						yourResources[key] = 0;
					}
				}
			}
		}

		alert('Successfully purchased '+ card.props.props.name);

		this.setState((prevState) => {

			let typePurchased = ((['ancient_wonder', 'modern_wonder'].indexOf(card.props.props.type) > -1) 
										? ('wonders') 
									: ((['person', 'technology', 'city'].indexOf(card.props.props.type) > -1)
										? ('supply') 
										: ('worker'))
									
									)+'Revealed';
			let returnState; 

			if(typePurchased === 'wondersRevealed'){

				prevState.wondersRevealed.splice(card.props.props.num, 1);

				alert('removing wonder');

				returnState = {
					...prevState, 
					player: {
						...prevState.player, 
						resources: {
							...prevState.player.resources, 
							gold: yourResources.gold,
							influence: yourResources.influence,
							science: yourResources.science,
							any: yourResources.any,
						}
					},
					wondersRevealed: prevState.wondersRevealed
				}

				returnState.wondersRevealed.push(prevState.wonderSupply.pop());

			} else if(typePurchased === 'supplyRevealed'){

				alert('removing supply card', card.props.props);

				let cardFunc = prevState.supplyRevealed.splice(card.props.props.num, 1);

				returnState = {
					...prevState, 
					player: {
						...prevState.player, 
						resources: {
							...prevState.player.resources, 
							gold: yourResources.gold,
							influence: yourResources.influence,
							science: yourResources.science,
							any: yourResources.any,
						}
					},
					supplyRevealed: prevState.supplyRevealed
				}

				returnState.supplyRevealed.push(prevState.supplyDeck.pop());

			} else{
				// Worker 
				let cardFunc;
				if(card.props.props.name === 'Scientist'){
					cardFunc = Scientist;
				} else if(card.props.props.name === 'Artist'){
					cardFunc = Artist;
				} else{
					cardFunc = Banker;
				}

				returnState = {
					...prevState, 
					player: {
						...prevState.player,
						discard: prevState.player.discard.concat(cardFunc),
						resources: {
							...prevState.player.resources, 
							gold: yourResources.gold,
							influence: yourResources.influence,
							science: yourResources.science,
							any: yourResources.any,
						}
					},
				}

				// if(card.props.props.name === 'Banker'){
				// 	returnState = {
				// 		...returnState, 
				// 		bankers: prevState.bankers - 1
				// 	}
				// } else if(card.props.props.name === 'Artist'){
				// 	returnState = {
				// 		...returnState, 
				// 		artists: prevState.artists - 1
				// 	}
				// } else if(card.props.props.name === 'Scientist'){
				// 	returnState = {
				// 		...returnState, 
				// 		scientists: prevState.scientists - 1
				// 	}
				// }
			}

			returnState.expandHandCard = false;
			returnState.expandedHandCard = false;
			returnState.expandSupplyCard = false;
			returnState.expandedSupplyCard = false;
			returnState.expandWonderCard = false;
			returnState.expandedWonderCard = false;

			return returnState;
		});
	}

	putOnCapital(card){
		console.log('putting on capital', card.props.props);
		this.setState(prevState => {
			let capital;
			if(card.props.props.type === 'worker'){
				capital = {
					...prevState.player.capital, 
					workers: prevState.player.capital.workers.concat(prevState.player.hand.splice(card.props.props.num, 1))
				}
			} else if(card.props.props.type === 'army'){
				capital = {
					...prevState.player.capital, 
					armies: prevState.player.capital.armies.concat(prevState.player.hand.splice(card.props.props.num, 1))
				}
			}

			return {
				...prevState, 
				expandHandCard: false,
				expandedHandCard: false, 
				player: {
					...prevState.player,
					hand: prevState.player.hand, 
					capital: capital

				}
			}
		})
	}

	endTurn = () => {
		if(this.props.turn === 1){

			let { player } = this.state, 
				hand = player.hand,
				discard = player.discard, 
				deck = player.deck
				played_cards = player.played_cards;
	
			if(hand.length > 0){
				played_cards = played_cards.concat(hand);
				hand = [];
			}
	
			discard = discard.concat(played_cards);
			played_cards = [];
	
			if(deck.length >= 5){
				hand.push(deck.pop());
				hand.push(deck.pop());
				hand.push(deck.pop());
				hand.push(deck.pop());
				hand.push(deck.pop());
			} else{
				let x = deck.length;
	
				for(let i = 0; i < x; i++){
					hand.push(deck.pop());
				}
	
				deck = deck.concat(discard);
	
				discard = [];
	
				deck = shuffle(deck);
	
				console.log('deck.length2 ', deck.length);
	
				while(hand.length < 5){
					console.log('adding another');
					hand.push(deck.pop());
				}
			}
	
			let x = this;
	
			this.setState(prevState => {
				return {
					...prevState, 
					player: {
						...prevState.player, 
						hand, 
						deck,
						played_cards, 
						discard, 
						resources: {
							gold: 0, 
							science: 0, 
							influence: 0,
							any: 0,
							toward: {
								person: {
									gold: 0, 
									science: 0, 
									influence: 0,
									any: 0,
								}, 
								technology: {
									gold: 0, 
									science: 0, 
									influence: 0,
									any: 0,
								}, 
								city: {
									gold: 0, 
									science: 0, 
									influence: 0,
									any: 0,
								}, 
								A_M_wonders: {
									gold: 0, 
									science: 0, 
									influence: 0,
									any: 0,
								}, 
								N_wonders: {
									gold: 0, 
									science: 0, 
									influence: 0,
									any: 0,
								}, 
								allWonders: {
									gold: 0, 
									science: 0, 
									influence: 0,
									any: 0,
								}, 
							}
						},
					}
				}
			}, () => {
				x._toggleSideBar();
				x.props.changeTurn(11);
				setTimeout(() => {
					alert('Your turn.');
					x.props.changeTurn(1);
				}, 5000);
			});
		}

	}

	render() {
		let height = Dimensions.get('window').height - 50;

		return (
			<View style={styles.container}>

				<View style={[styles.areasContainer, {height: '70%'}]}>
					<SupplyArea 
						supplyDeck={this.state.supplyDeck}
						supplyRevealed={this.state.supplyRevealed}
						expandSupplyCard={this.expandSupplyCard.bind(this)}
						unExpandSupplyCard={this.unExpandSupplyCard.bind(this)}
					/>
					<View style={{width: '50%', flexDirection: 'column'}}>
						<View style={{height: '30%', width: '100%'}}>
							<WonderArea 
								players_to_wonders={this.state.players_to_wonders}
								wondersRevealed={this.state.wondersRevealed}
								wonderSupply={this.state.wonderSupply}
								num_of_players={this.state.num_of_players}
								expandWonderCard={this.expandWonderCard.bind(this)}
							/>
						</View>
			{/* 
				DECKS 
			*/}
						<View style={{backgroundColor: '#111', height: '70%', width: '100%'}}>
							<View style={styles.decksCon}>
								<View style={[styles.decks, {marginBottom: 5}]}><Text>Natural</Text><Text>{this.state.naturalWonders.length}</Text></View>
								<View style={[styles.decks, {marginBottom: 5}]}><Text>A/M</Text><Text>{this.state.wonderSupply.length}</Text></View>
								<View style={styles.decks}><Text>Supply</Text><Text>{this.state.supplyDeck.length}</Text></View>
							</View> 
						</View>
					</View>
				</View>

				<View style={[styles.areasContainer, {height: '30%', alignItems: 'center'}]}>
					<PlayerArea 
						player={this.state.player} 
						toggleDim={this.toggleDim.bind(this)}
						expandHandCard={this.expandHandCard.bind(this)}
					/>
				</View>

				{this.state.dim ? <TouchableWithoutFeedback onPress={this.closeAllEnemies.bind(this)}><View style={styles.overlay}/></TouchableWithoutFeedback> : null}

				<View style={this.state.dim ? [styles.opponentContainer, styles.opponentContainerExp, {top: 0, width: '85%', right: null}] : styles.opponentContainer}>
					{	this.state.dim ? 
						Object.keys(this.state.enemies).map(enemyId => {
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
					})
					: <TouchableOpacity 
						style={{
							backgroundColor: '#0aa',
							margin: 10,
							alignItems: 'center'
						}} 
						onPress={this.expandEnemy.bind(this, 1)}><Text>Opponents</Text></TouchableOpacity>}
				</View>

				{/*
				
				EXPANDED CARDS
				
				 */}

				{this.state.expandSupplyCard ? (
					<View style={{backgroundColor: '#000', position:'absolute', width: (height) / 1.56, height: height, right: 15}}>
						{this.state.expandedSupplyCard}
						<TouchableOpacity 
							onPress={this.unExpandSupplyCard.bind(this)}
							style={{position: 'absolute', height: '70%', width: '100%', top: 0}}
						/>
						<TouchableOpacity
							style={{position: 'absolute', height: '20%', width: '50%', bottom: 0, right: 0 }}
							onPress={this.buySupplyCard.bind(this, this.state.expandedSupplyCard)}
						/>
						<View style={{
							position: 'absolute', 
							right: -150,
							top: 30,
							justifyContent: 'flex-start',
							height: '100%',
						}}>
							{
								this.state.expandedSupplyCard.props.props.type === 'worker' 
								|| this.state.expandedSupplyCard.props.props.type === 'army'

								? 
									<TouchableOpacity 
										style={{
											width: 150,
											alignSelf: 'flex-start',
											backgroundColor: '#f0f',
											borderRadius: 50,
											padding: 20,
										}}
										onPress={this.putOnCapital.bind(this, this.state.expandedSupplyCard)}
									>
										<Text>Put on Capital</Text>
									</TouchableOpacity>
								: undefined
							}
							
							{
								this.state.expandedSupplyCard.props.props.cost.gold > 0 
								? 
									<View style={styles.sideBubblesCon}>
										<LinearGradient 
											colors={['#fff', '#f27']}
											style={styles.sideBubbles}
										>
											<Image 
												source={require('../../assets/symbols/actions/Gold.png')}
												style={{
													width: '100%', 
													height: '100%', 
												}} 
											/>
										</LinearGradient>
									</View>
								: undefined
							}
							{
								this.state.expandedSupplyCard.props.props.cost.science > 0 
								? 
									<View style={styles.sideBubblesCon}>
										<LinearGradient 
											colors={['#fff', '#f27']}
											style={styles.sideBubbles}
										>
											<Image 
												source={require('../../assets/symbols/actions/Science.png')}
												style={{
													width: '100%', 
													height: '100%', 
												}} 
											/>
										</LinearGradient>
									</View>
								: undefined
							}
							{
								this.state.expandedSupplyCard.props.props.cost.influence > 0 
								? 
									<View style={styles.sideBubblesCon}>
										<LinearGradient 
											colors={['#fff', '#f27']}
											style={styles.sideBubbles}
										>
											<Image 
												source={require('../../assets/symbols/actions/Influence.png')}
												style={{
													width: '100%', 
													height: '100%', 
												}} 
											/>
										</LinearGradient>
									</View>
								: undefined
							}
						</View>
					</View>
				) : undefined}

				{this.state.expandWonderCard ? (
					<View style={{backgroundColor: '#000', position:'absolute', width: (height) / 1.56, height: height, left: 15}}>
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
						<View style={{
							position: 'absolute', 
							right: -150,
							top: 30,
							justifyContent: 'flex-start',
							height: '100%',
						}}>
							{
								this.state.expandedWonderCard.props.props.type === 'worker' 
								|| this.state.expandedWonderCard.props.props.type === 'army'

								? 
									<TouchableOpacity 
										style={{
											width: 150,
											alignSelf: 'flex-start',
											backgroundColor: '#f0f',
											borderRadius: 50,
											padding: 20,
										}}
										onPress={this.putOnCapital.bind(this, this.state.expandedWonderCard)}
									>
										<Text>Put on Capital</Text>
									</TouchableOpacity>
								: undefined
							}
							
							{
								this.state.expandedWonderCard.props.props.cost.gold > 0 
								? 
									<View style={styles.sideBubblesCon}>
										<LinearGradient 
											colors={['#fff', '#f27']}
											style={styles.sideBubbles}
										>
											<Image 
												source={require('../../assets/symbols/actions/Gold.png')}
												style={{
													width: '100%', 
													height: '100%', 
												}} 
											/>
										</LinearGradient>
									</View>
								: undefined
							}
							{
								this.state.expandedWonderCard.props.props.cost.science > 0 
								? 
									<View style={styles.sideBubblesCon}>
										<LinearGradient 
											colors={['#fff', '#f27']}
											style={styles.sideBubbles}
										>
											<Image 
												source={require('../../assets/symbols/actions/Science.png')}
												style={{
													width: '100%', 
													height: '100%', 
												}} 
											/>
										</LinearGradient>
									</View>
								: undefined
							}
							{
								this.state.expandedWonderCard.props.props.cost.influence > 0 
								? 
									<View style={styles.sideBubblesCon}>
										<LinearGradient 
											colors={['#fff', '#f27']}
											style={styles.sideBubbles}
										>
											<Image 
												source={require('../../assets/symbols/actions/Influence.png')}
												style={{
													width: '100%', 
													height: '100%', 
												}} 
											/>
										</LinearGradient>
									</View>
								: undefined
							}
						</View>
					</View>
				) : undefined}

				{this.state.expandHandCard ? (
					<View style={{backgroundColor: '#000', position:'absolute', width: (height) / 1.56, height: height }}>
						<View>
							{this.state.expandedHandCard}
							<TouchableOpacity 
								style={{
									position: 'absolute', 
									height: '50%', 
									width: '100%', 
									top: 0
								}}
								onPress={this.unExpandHandCard.bind(this)} 
							/>
							<TouchableOpacity
								style={{
									position: 'absolute', 
									height: '50%', 
									width: '50%', 
									bottom: 0, 
									left: 0, 
									backgroundColor: 'rgba(150, 50, 0, 0.7)' 
								}}
								onPress={this.chooseOption.bind(this, 1, this.state.expandedHandCard)}
							/>
							<TouchableOpacity
								style={{
									position: 'absolute', 
									height: '50%', 
									width: '50%', 
									bottom: 0, 
									right: 0, 
									backgroundColor: 'rgba(150, 50, 0, 0.7)' 
								}}
								onPress={this.chooseOption.bind(this, 2, this.state.expandedHandCard)}
							/>
							
								<View style={{
									position: 'absolute', 
									right: -150,
									top: 30,
									justifyContent: 'flex-start',
									height: '100%',
								}}>
									{
										this.state.expandedHandCard.props.props.type === 'worker' 
										|| this.state.expandedHandCard.props.props.type === 'army'

										? 
											<TouchableOpacity 
												style={{
													width: 150,
													alignSelf: 'flex-start',
													backgroundColor: '#f0f',
													borderRadius: 50,
													padding: 20,
												}}
												onPress={this.putOnCapital.bind(this, this.state.expandedHandCard)}
											>
												<Text>Put on Capital</Text>
											</TouchableOpacity>
										: undefined
									}
								</View>
						</View>
					</View>
				) : undefined}


				{/*
				
					SLIDER

				 */}

				<Animated.View style={[styles.slider, this.sidebarAnimation.getLayout()]}>
					<TouchableOpacity style={{width: '100%', height: '20%', justifyContent: 'center'}}><Text style={{color: '#fff', textAlign: 'center'}}>RULES (work in prog)</Text></TouchableOpacity>
					<TouchableOpacity style={{width: '100%', height: '20%', justifyContent: 'center'}}><Text style={{color: '#fff', textAlign: 'center'}}>UNDO (work in prog)</Text></TouchableOpacity>
					<TouchableOpacity style={{width: '100%', height: '20%', justifyContent: 'center'}} onPress={this.endTurn.bind(this)}><Text style={{color: '#fff', textAlign: 'center'}}>END TURN</Text></TouchableOpacity>
					<TouchableOpacity onPress={this.props.goBack} style={{width: '100%', height: '20%', justifyContent: 'center'}}><Text style={{color: '#fff', textAlign: 'center'}}>QUIT</Text></TouchableOpacity>
				</Animated.View>

				<Ionicons 
					style={styles.goBack} 
					name="md-settings" 
					size={32} 
					color="black" 
					onPress={this._toggleSideBar.bind(this)}
				/>
			
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
		backgroundColor: '#222'
	},
	areasContainer:{
		flexDirection: 'row',
	},
	opponentContainer: {
		position: 'absolute',
		flexDirection: 'row',
		width: '50%',
		// top: 0,
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
	},
	slider: {
		position: 'absolute', 
		width: '30%', 
		height: '100%', 
		top: 0, 
		left: 0,
		backgroundColor: 'rgba(88, 33, 88, 0.8)',
		alignItems: 'center',
		justifyContent: 'center',
	},
	sideBubbles: {
		width: 50, 
		height: 50, 
		borderRadius: 25, 
		backgroundColor: '#555', 
		padding: 8,
		alignSelf: 'flex-start'
	},
	sideBubblesCon: {
		width: 150,
		marginBottom: 10
	},
	decks: {
		backgroundColor: '#57f', 
		justifyContent: 'center',
		width: '80%', 
		height: '30%', 
		alignItems: 'center'
	},
	decksCon: {
		width: '20%', 
		height: '100%', 
		alignItems: 'center', 
		justifyContent: 'space-evenly',
	}
});
  
export default NewGame = connect(mapStateToProps, mapDispatchToProps)(NewGame1);