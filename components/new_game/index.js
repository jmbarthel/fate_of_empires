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

// Setup
import { shuffle, setupInitialState, endOfTurnCleanup } from '../utils/utilities.js';

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

		this.state = setupInitialState(this.props.num_of_players);

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

	chooseOption(choice, card, player){
		let { choiceCount, choices } = card.props.props;

		console.log('you ', player, 'chose: ', choice, 'choicecount: ', choiceCount);

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

				prevState = func(card, player, prevState);
			}

			return {
				...prevState, 
				expandHandCard: false, 
				expandedHandCard: false, 
			
				expandSupplyCard: false, 
				expandedSupplyCard: false,

				expandWonderCard: false, 
				expandedWonderCard: false, 
			}
		}, () => {
			this.checkForEffects(card, player);
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

	checkForEffects = (card, player) => {
		// Check for 
		// Check for reveal effects

		if(this.state.callbacks.length > 0){
			let func = this.state.callbacks.shift();
			this.setState(prevState => {
				return func(card, player, prevState)
			});
		}

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
	
			let _this = this;
	
			this.setState(prevState => {
				return endOfTurnCleanup(_this.props.turn, playerNum, prevState);

				
			}, () => {
				// Close the sidebar
				_this._toggleSideBar();
				// End the turn, advance to the next turn or roll back to zero if at max turn
				_this.props.changeTurn(11);
				setTimeout(() => {
					alert('Your turn.');
					_this.props.changeTurn(0);
				}, 500);
			});
		} else{
			// Trying to end the turn when it is not your turn.
			alert('Not your turn');
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

	confirmAddToWonder = (playerNumber, resources) => {
		console.log(resources);
		this.setState(prevState => {

			return {
				...prevState, 
				players: {
					...prevState.players,
					[playerNumber]: {
						...prevState.players[playerNumber],
						resources: {
							...prevState.players[playerNumber].resources, 
						}
					}
				}
			}
		})

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
				<View pointerEvents='box-none' style={{ height: '100%', width: '100%', color: 'rgba(150, 150, 0, 0.5)', position: 'absolute',}}></View>

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

							confirmAddToWonder={this.confirmAddToWonder.bind(this)}
							
							permanent_cost_reductions={this.state.permanent_cost_reductions[this.state.playerNumber]}
							temporary_cost_reductions={this.state.temporary_cost_reductions[this.state.playerNumber]}
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