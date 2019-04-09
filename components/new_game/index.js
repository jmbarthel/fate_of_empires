import React from 'react';
import { Dimensions, View, StyleSheet, Animated, TouchableOpacity, TouchableWithoutFeedback, Text } from "react-native";
import { connect } from 'react-redux';
import SupplyArea from '../game/supply_area/index.js';
import WonderArea from '../game/wonder_area/index.js';
import PlayerArea from '../game/player_area/index.js';
import Opponent from '../game/opponent/index.js';
import ExpandedCapital from './expanded_capital.js';
import ExpandedCards from './expanded_cards.js';
import { Ionicons } from '@expo/vector-icons';

import { changeTurn } from "../../actions/index.js";

// Cards
import Peasant from '../game/cards/starters/Peasant.js';
import HumanitarianAid from '../game/cards/starters/HumanitarianAid.js';

// Setup
import assembleSupplyDeck from '../utils/assemble_supply_cards.js';
import assembleWonderDeck from '../utils/assemble_wonder_cards.js';

import { shuffle } from '../utils/utilities.js';

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
				region: '',
				flag: '',
				deck: [],
				hand: [],
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
			wondersRevealed.push(
				{	
					claimedBy: {},
					progress: {
						/** Keys are the players flags
						 flag: {
								gold: 0, 
								science: 0, 
								influence: 0,
						 },
						 flag: {
								gold: 0, 
								science: 0, 
								influence: 0,
						 }
						 */
					},
					card: wonderSupply.pop()
				});
		}

		wondersRevealed.push(
			{	
				claimedBy: {
					'japan': true,
					'rome': true,
				},
				progress: {
					japan: {
							gold: 0, 
							science: 0, 
							influence: 0,
					},
					rome: {
							gold: 10, 
							science: 6, 
							influence: 2,
					},
				},
				card: Coricancha
			});

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
		// playerDeck.push(HumanitarianAid);

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

		playerHand = shuffle(playerHand);

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
			playerNumber: 0,
			dim: false,
			expandSupplyCard: false, 
			expandedSupplyCard: false,
			expandWonderCard: false, 
			expandedWonderCard: false,
			expandHandCard: false, 
			expandedHandCard: false,

			expandedCapital: false,

			previousState: null,
			players: {
				0: {
					id: 0, 
					name: 'Player', 
					region: 'blue', 
					trait: null,
					flag: 'japan',
	
					claimedWonder: false,
					hand: playerHand, 
					deck: playerDeck,
					discard: [], 
					played_cards: [],
	
					centralized_government: false,
	
					natural_wonders: [],
					ancient_wonders: [],
					modern_wonders: [], 
	
					resources: {
						gold: 10, 
						science: 10, 
						influence: 10,
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
							yourRegion: {
								gold: 0, 
								science: 0, 
								influence: 0, 
								any: 0
							},
							otherRegion: {
								gold: 0, 
								science: 0, 
								influence: 0, 
								any: 0
							}
						}
					},
					capital: {
						workers: [], 
						armies: [],
						other: [],
					},
				}
			},

			enemies: enemyArr, 
			num_of_enemies: num_of_enemies,
			num_of_players: num_of_players,

			governmentPurchased: false,
			ageOfEnlightenment: false, 
			resolvingAgeOfEnlightenment: false,

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
		if(this.state.expandedSupplyCard && this.state.expandedSupplyCard.props.props.name === card.props.props.name){
			this.unExpandSupplyCard();
		} else{
			this.setState({
				expandSupplyCard: true, 
				expandedSupplyCard: card,
				expandHandCard: false, 
				expandedHandCard: false, 
				expandWonderCard: false, 
				expandedWonderCard: false,
			});
		}
	}

	unExpandSupplyCard(){
		this.setState({
			expandSupplyCard: false, 
			expandedSupplyCard: false
		});
	}

	expandWonderCard(card){
		if(this.state.expandedWonderCard && this.state.expandedWonderCard.props.props.name === card.props.props.name){
			this.unExpandWonderCard();
		} else{
			this.setState({
				expandWonderCard: true, 
				expandedWonderCard: card,
				expandSupplyCard: false, 
				expandedSupplyCard: false,
				expandHandCard: false, 
				expandedHandCard: false, 
			});
		}
	}

	unExpandWonderCard(){
		this.setState({
			expandWonderCard: false, 
			expandedWonderCard: false
		});
	}

	expandHandCard(card){
		this.setState({
			expandHandCard: true, 
			expandedHandCard: card, 
			expandWonderCard: false, 
			expandSupplyCard: false, 
			expandedSupplyCard: false, 
			expandedWonderCard: false,
			expandedCapital: false,
		});
	}

	unExpandHandCard(){
		this.setState({expandHandCard: false, expandedHandCard: false});
	}

	expandCapital(){
		this.setState({expandedCapital: true});
	}

	closeCapital(){
		this.setState({expandedCapital: false});
	}

	chooseOption(choice, card, player, callbackArray){
		let { choiceCount, choices } = card.props.props;

		console.log('you chose: ', choice, 'choicecount: ', choiceCount);

		if(choiceCount === 1){
			choice = 1;
		}
		
		let chosenOption = choices[choice];

		console.log(chosenOption);

		// Check if it has advance time, if so, interrupt the setstate with a transition state to choose the card. Then resume this function here.
		// Replace 'choices' in each card with functions, called below.

		this.setState((prevState) => {
			let num = chosenOption.length;

			for(let i = 0; i < num; i++){
				let func = chosenOption[i];

				prevState = func(player, prevState);
			}
			
			// Remove the card from your hand
			let played_cards;

			if(!card.props.props.capital){
				// Playing from your hand
				played_cards = prevState.players[player].played_cards.concat(prevState.players[player].hand.splice(card.props.props.num, 1));
			} else{
				// Playing from the capital
				if(card.props.props.type === 'worker'){
					played_cards = prevState.players[player].played_cards.concat(prevState.players[player].capital.workers.splice(card.props.props.num, 1));
				} else if(card.props.props.type === 'army'){
					played_cards = prevState.players[player].played_cards.concat(prevState.players[player].capital.armies.splice(card.props.props.num, 1));
				} else{
					played_cards = prevState.players[player].played_cards.concat(prevState.players[player].capital.other.splice(card.props.props.num, 1));
				}
			}

			return {
				...prevState, 
				expandHandCard: false, 
				expandedHandCard: false, 
				players: {
					...prevState.players, 
					[player]: {
						...prevState.players[player], 
						played_cards
					}
				}
			}
		})
	}

	buySupplyCard(card, player){
		let { cost, type, region } = card.props.props;

		let yourResources = { 
			gold: this.state.players[player].resources.gold, 
			influence: this.state.players[player].resources.influence, 
			science: this.state.players[player].resources.science, 
			any: this.state.players[player].resources.any, 
			toward: this.state.players[player].resources.toward,
		};

		let regionalTowards; 

		if(region === this.state.players[player].region){
			regionalTowards = 'yourRegion';
		} else{
			regionalTowards = 'otherRegion';
		}

		let error = false;

		let options = ['gold', 'science', 'influence'];

		for(let index = 0; index < options.length; index++){
			let resourceType = options[index];

			if(cost[resourceType] > 0){
				if((
					yourResources.any + 
					yourResources[resourceType] + 
					// Workers and armies don't have cards that produce resources toward them
					(
						(['worker', 'army'].indexOf(type) === -1) 
						? (yourResources.toward[type][resourceType]) 
						: (0)
					) + 
					// Some cards do not have regions (workers/armies)
					(
						(['blue', 'red', 'yellow', 'purple', 'green'].indexOf(type) > -1) 
						? (yourResources.toward[regionalTowards][resourceType] < cost[resourceType]) 
						: (0)
					)
				) < cost[resourceType]){
					alert('1 You cannot afford '+card.props.props.name);
					error = true;
					break;
				}
	
				let i = 0;
	
				while(i < cost[resourceType]){
	
					if(yourResources.toward[type][resourceType] > 0){
						yourResources.toward[type][resourceType]--;
						i++;
						continue;
					}
	
					if(yourResources.toward[type].any > 0){
						yourResources.toward[type].any--;
						i++;
						continue;
					}
					
					if(regionalTowards){
						if(yourResources.toward[regionalTowards][resourceType]){
							yourResources.toward[regionalTowards][resourceType]--;
							i++;
							continue;
						}
					}
	
					if(yourResources[resourceType] > 0){
						yourResources[resourceType]--;
						i++;
						continue;
					}
	
					if(yourResources.any > 0){
						yourResources.any--;
						i++;
						continue;
					}
				}
	
				// if(yourResources.gold < cost.gold){
				// 	if(yourResources.any + yourResources.gold + towardResources.gold < cost.gold){
				// 		alert('1You cannot afford '+card.props.props.name);
				// 		return;
				// 	} else{
				// 		cost.gold -= yourResources.towardgold;
				// 		yourResources.gold -= yourResources.gold;
				// 		yourResources.any -= cost.gold;
				// 		cost.gold = 0;
				// 	}
				// } else{
				// 	yourResources.gold -= cost.gold;
				// }
			}
		}

		if(error){
			return;
		}

		if(cost.any > 0){
			if(yourResources.gold + yourResources.influence + yourResources.science + yourResources.any < cost.any){
				alert('2 You cannot afford '+card.props.props.name);
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
					players: {
						...prevState.players, 
						[player]: {
							...prevState.players[player], 
							discard: prevState.players[player].discard.concat(cardFunc),
							resources: {
								gold: yourResources.gold,
								influence: yourResources.influence,
								science: yourResources.science,
								any: yourResources.any,
								toward: yourResources.toward
							}
						}						
					},
					wondersRevealed: prevState.wondersRevealed
				}

				returnState.wondersRevealed.push(prevState.wonderSupply.pop());

			} else if(typePurchased === 'supplyRevealed'){

				// alert('removing supply card', card.props.props);

				let cardFunc = prevState.supplyRevealed.splice(card.props.props.num, 1);

				returnState = {
					...prevState, 
					players: {
						...prevState.players,
						[player]: {
							...prevState.players[player],
							discard: prevState.players[player].discard.concat(cardFunc),
							resources: {
								gold: yourResources.gold,
								influence: yourResources.influence,
								science: yourResources.science,
								any: yourResources.any,
								toward: yourResources.toward
							}
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
					players: {
						...prevState.players, 
						[player]:{
							...prevState.players[player],
							discard: prevState.players[player].discard.concat(cardFunc),
							resources: {
								gold: yourResources.gold,
								influence: yourResources.influence,
								science: yourResources.science,
								any: yourResources.any,
								toward: yourResources.toward
							}
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

	putOnCapital(card, player){

		console.log('putting on capital', card.props.props);

		if(
			(
				card.props.props.type === 'worker' 
				&& 
				this.state.players[player].capital.workers.length >= this.state.players[player].natural_wonders.length + 1
				&& 
				this.state.players[player].capital.workers.length <= 4
			) 
			|| 
			(
				card.props.props.type === 'army' 
				&& 
				this.state.players[player].capital.armies.length >= this.state.players[player].natural_wonders.length + 1 
				&&
				this.state.players[player].capital.armies.length <= 4
			)
		){
			alert('You have the maximum number of '+card.props.props.type+' cards on your capital.');
		} else{
			this.setState(prevState => {

				let capital;

				if(card.props.props.type === 'worker'){
					capital = {
						...prevState.players[player].capital, 
						workers: prevState.players[player].capital.workers.concat(prevState.players[player].hand.splice(card.props.props.num, 1))
					}
				} else if(card.props.props.type === 'army'){
					capital = {
						...prevState.players[player].capital, 
						armies: prevState.players[player].capital.armies.concat(prevState.players[player].hand.splice(card.props.props.num, 1))
					}
				}
	
				return {
					...prevState, 
					expandHandCard: false,
					expandedHandCard: false, 
					players: {
						...prevState.players, 
						[player]: {
							...prevState.players[player],
							hand: prevState.players[player].hand, 
							capital: capital
						}
					}
				}
			});
		}
	}

	placeFlag(card, player){
		// console.log('placing flag on ', card);
		this.setState(prevState => {
			let wondersRevealed = prevState.wondersRevealed;

			wondersRevealed[card.props.props.num].claimedBy[prevState.players[player].flag] = true;

			wondersRevealed[card.props.props.num].progress[prevState.players[player].flag] = {
				gold: 0, 
				science: 0,
				influence: 0, 
			};

			return {
				...prevState, 
				players: {
					...prevState.players,
					[player]: {
						...prevState.players[player], 
						claimedWonder: card.props.props.name,
					}
				},
				wondersRevealed
			}
		});
	}

	applyCostReduction(card){
		// This takes a card and returns the cost of the card after all reductions are applied
		return card.props.props.cost;
	}

	checkStartOfTurn(){
		// This is called at the start of each turn, and places cost reductions/other static card effects into state
		this.setState(prevState => {
			return {
				...prevState,
				startOfTurnQueue: false
			}
		})
	}

	endTurn = (playerNum) => {
		if(this.props.turn === playerNum){
			let player = this.state.players[playerNum],
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
	
				while(hand.length < 5){
					hand.push(deck.pop());
				}
			}
	
			let x = this;
	
			this.setState(prevState => {
				let wondersRevealed, wonderSupply, ageOfEnlightenment, resolvingAgeOfEnlightenment;

				if(prevState.governmentPurchased){
					wondersRevealed = JSON.parse(JSON.stringify(prevState.wondersRevealed));
					wonderSupply = JSON.parse(JSON.stringify(prevState.wonderSupply));

					// cycle the wonders
					let wonderToPopIdx;

					for(let i = 0; i < prevState.wondersRevealed.length; i++){
						if(Object.keys(prevState.wondersRevealed[i].claimedBy).length <= 0){
							wonderToPopIdx = i;
							break;
						}
					}

					let newWonder = wonderSupply.pop();
					if(newWonder.card.props.props.name === 'ageOfEnlightenment'){
						ageOfEnlightenment = true;
						resolvingAgeOfEnlightenment = true;
					}
	
					wondersRevealed.splice(wonderToPopIdx, 1);
					wondersRevealed.push(wonderSupply.pop());

				} else{
					wondersRevealed = prevState.wondersRevealed;
					wonderSupply = prevState.wonderSupply;
					ageOfEnlightenment = false;
					resolvingAgeOfEnlightenment = false;
				}

				return {
					...prevState, 
					wondersRevealed, 
					wonderSupply,
					ageOfEnlightenment,
					startOfTurnQueue: true,
					expandedCapital: false,
					expandHandCard: false,
					expandedHandCard: false,
					expandSupplyCard: false,
					expandedSupplyCard: false,
					expandWonderCard: false,
					expandedWonderCard: false,
					players: {
						...prevState.players,
						[playerNum]: {
							...prevState.players[playerNum],
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
									yourRegion: {
										gold: 0, 
										science: 0, 
										influence: 0,
										any: 0,
									},
									otherRegion: {
										gold: 0, 
										science: 0, 
										influence: 0,
										any: 0,
									}
								}
							},
						},
					}
				}
			}, () => {
				// Close the sidebar
				x._toggleSideBar();
				// End the turn, advance to the next turn or roll back to zero if at max turn
				x.props.changeTurn(11);
				setTimeout(() => {
					alert('Your turn.');
					x.props.changeTurn(0);
				}, 500);
			});
		}

	}

	undoLastAction = () => {

	}

	buyGovernment = (resource, player) => {
		let any = this.state.players[player].resources.any, 
			resourceAmount = this.state.players[player].resources[resource];

		let pass = (any + resourceAmount >= 10);

		if(pass){
			
			console.log('buying a government');

		} else{
			return;
		}

		if(pass){
			this.setState(prevState => {
				return {
					...prevState, 
					ageOfEnlightenment: true,
					players: {
						...prevState.players, 
						[player]: {
							...prevState.players[player],
							centralized_government: true,
						}
					},
				}
			});
		}
	}

	render(){
		let screenHeight = Dimensions.get('window').height;
		let cardHeight = screenHeight - 50;
		let screenWidth = Dimensions.get('window').width;
		let cardWidth = cardHeight / 1.56;

		if(this.state.startOfTurnQueue){
			// If we are starting a turn, check the start of turn and apply cost reductions to cards
			setTimeout(() => {
				this.checkStartOfTurn();
			});
		} 

		return (
			<View style={styles.container}>

				<View style={[styles.areasContainer, {height: '70%'}]}>
					<SupplyArea 
						supplyDeck={this.state.supplyDeck}
						supplyRevealed={this.state.supplyRevealed}
						expandSupplyCard={this.expandSupplyCard.bind(this)}
						unExpandSupplyCard={this.unExpandSupplyCard.bind(this)}
						playerNumber={this.state.playerNumber}
					/>
					<View style={{width: '50%', flexDirection: 'column'}}>
						<View style={{height: '30%', width: '100%'}}>
							<WonderArea 
								players_to_wonders={this.state.players_to_wonders}
								wondersRevealed={this.state.wondersRevealed}
								wonderSupply={this.state.wonderSupply}
								num_of_players={this.state.num_of_players}
								expandWonderCard={this.expandWonderCard.bind(this)}
								playerNumber={this.state.playerNumber}
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
						player={this.state.players[this.state.playerNumber]} 
						toggleDim={this.toggleDim.bind(this)}
						expandHandCard={this.expandHandCard.bind(this)}
						expandCapital={this.expandCapital.bind(this)}
						playerNumber={this.state.playerNumber}
					/>
				</View>

				{this.state.dim ? <TouchableWithoutFeedback onPress={this.closeAllEnemies.bind(this)}><View style={styles.overlay}/></TouchableWithoutFeedback> : null}

{/* 
OPPONENTS
*/}

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

				<Ionicons 
					style={styles.goBack} 
					name="md-settings" 
					size={32} 
					color="white" 
					onPress={this._toggleSideBar.bind(this)}
				/>

{/*
EXPANDED CARDS
*/}
				{/* {
					this.state.expandHandCard || this.state.expandSupplyCard || this.state.expandWonderCard
					?  */}
						<ExpandedCards
							screenHeight={screenHeight}
							cardHeight={cardHeight}
							screenWidth={screenWidth}
							cardWidth={cardWidth}
		
							player={this.state.players[this.state.playerNumber]}
							playerNumber={this.state.playerNumber}
							expandHandCard={this.state.expandHandCard}
							expandedHandCard={this.state.expandedHandCard}
							expandSupplyCard={this.state.expandSupplyCard}
							expandedSupplyCard={this.state.expandedSupplyCard}
							expandWonderCard={this.state.expandWonderCard}
							expandedWonderCard={this.state.expandedWonderCard}
							wondersRevealed={this.state.wondersRevealed}
		
							putOnCapital={this.putOnCapital.bind(this)}
							placeFlag={this.placeFlag.bind(this)}
							chooseOption={this.chooseOption.bind(this)}
							buySupplyCard={this.buySupplyCard.bind(this)}
							unExpandHandCard={this.unExpandHandCard.bind(this)}
							unExpandSupplyCard={this.unExpandSupplyCard.bind(this)}
							unExpandWonderCard={this.unExpandWonderCard.bind(this)}
						/>
					{/* : undefined
				} */}

{/*
EXPANDED CAPITAL
*/}
				{
					this.state.expandedCapital ? 
						(
							<ExpandedCapital 
								capital={this.state.players[this.state.playerNumber].capital} 
								chooseOption={this.chooseOption.bind(this)}
								expandHandCard={this.expandHandCard.bind(this)}
								closeCapital={this.closeCapital.bind(this)}
							/>
						)
					: undefined
				}
{/*
SLIDER
*/}
				<Animated.View style={[styles.slider, this.sidebarAnimation.getLayout()]}>
					<Ionicons 
						style={{position: 'absolute', top: 10, left: 20}} 
						name="md-close" 
						size={32} 
						color="white" 
						onPress={this._toggleSideBar.bind(this, true)}
					/>
					<TouchableOpacity style={{width: '100%', height: '10%', justifyContent: 'center'}}><Text style={{color: '#fff', textAlign: 'center'}}>RULES (work in prog)</Text></TouchableOpacity>
					<TouchableOpacity onPress={this.undoLastAction.bind(this)} style={{width: '100%', height: '10%', justifyContent: 'center'}}><Text style={{color: '#fff', textAlign: 'center'}}>UNDO (work in prog)</Text></TouchableOpacity>
					<TouchableOpacity style={{width: '100%', height: '10%', justifyContent: 'center'}} onPress={this.endTurn.bind(this, this.state.playerNumber)}><Text style={{color: '#fff', textAlign: 'center'}}>END TURN</Text></TouchableOpacity>
					<TouchableOpacity style={{width: '100%', height: '10%', justifyContent: 'center'}} onPress={() => {console.log(this.state)}}><Text style={{color: '#fff', textAlign: 'center'}}>Print Gamestate to Console</Text></TouchableOpacity>
					<TouchableOpacity onPress={this.props.goBack} style={{width: '100%', height: '10%', justifyContent: 'center'}}><Text style={{color: '#fff', textAlign: 'center'}}>QUIT</Text></TouchableOpacity>
				</Animated.View>
			
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
	decks: {
		backgroundColor: '#57f', 
		justifyContent: 'center',
		width: '80%', 
		height: '30%', 
		alignItems: 'center',
		borderRadius: 10,
	},
	decksCon: {
		width: '20%', 
		height: '100%', 
		alignItems: 'center', 
		justifyContent: 'space-evenly',
	}
});
  
export default NewGame = connect(mapStateToProps, mapDispatchToProps)(NewGame1);