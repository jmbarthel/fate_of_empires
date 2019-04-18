// Setup
import assembleSupplyDeck from '../utils/assemble_supply_cards.js';
import assembleWonderDeck from '../utils/assemble_wonder_cards.js';

// Cards
import Peasant from '../game/cards/starters/Peasant.js';
import HumanitarianAid from '../game/cards/starters/HumanitarianAid.js';


export const shuffle = a => {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

export const setupInitialState = (num_of_players) => {
    let enemyArr = {};

		// SET ENEMIES
		let num_of_enemies = num_of_players - 1;

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
					claimedBy: {
                    /**
                        'japan': true
                     */

                    },
					progress: {
						/** Keys are the players flags
						 'japan': {
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

		// for(let i = 0; i < setUpDraws['1'].draw; i++){
		// playerHand.push(playerDeck.pop());
		// }
		playerHand.push(Aristotle);
		playerHand.push(Aristotle);
		playerHand.push(Aristotle);
		playerHand.push(Peasant);
		playerHand.push(Peasant);

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

		let temporary_cost_reductions = {};
		let permanent_cost_reductions = {};

		for(let i = 0; i < num_of_players; i++){
			temporary_cost_reductions[i] = {}
			permanent_cost_reductions[i] = {}
        }
        
        return {
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

			permanent_cost_reductions,
			temporary_cost_reductions,

			choosingACard: false,
			choosingACardCallback: false,

			revealedCards: [
				// This should be an array of objects like such: 
				/**
				 {
					 card: // a card object
					 location: // the place it was revealed from
				 }
				 */
			],

            callbacks: [],

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

}

const recursiveObjectAdder = (object1, object2) => {
	let resultObject = {};

	for(let key in object1){
		if(!object2[key]){
			resultObject[key] = object1[key];

		} else if(typeof object1[key] === 'object' && typeof object2[key] === 'object'){
			resultObject[key] = recursiveObjectAdder(object1[key], object2[key]);

		} else if(typeof object1[key] === 'number' && typeof object2[key] === 'number'){
			resultObject[key] = object1[key] + object2[key];
		}
	}

	for(let key in object2){
		if(!object1[key]){
			resultObject[key] = object2[key];
		}
	}


	return resultObject;
}

export const applyCostReduction = (card, player, state) => {
	let tempCostReductions = state.temporary_cost_reductions[player];
	let permCostReductions = state.permanent_cost_reductions[player];

	let costReductions = recursiveObjectAdder(tempCostReductions, permCostReductions);

	let { cost, type } = card.props.props;

	let resultCost = {
		gold: (cost.gold||0),
		science: (cost.science||0), 
		influence: (cost.influence||0),
	}

	let resourceTypes = ['gold', 'science', 'influence'];

	// TODO: Same and other regions - have to make all cards region property an array of their regions, since cards can have multiple regions
	// if(costReductions.otherRegion || costReductions.yourRegion){
	// 	if(card.props.props.region.length > 0){
	// 		if(card.props.props.region.indexOf(state.players[player].region) > -1){
				
	// 		} else{
	
	// 		}
	// 	}
	// }
	if(!Array.isArray(type)){
		type = [type];
	}

	// city, person, tech, worker
	if(['city', 'person', 'technology', 'worker'].indexOf(type) > -1){
		if(costReductions[type]){
			for(let resource of resourceTypes){
				if(typeof costReductions[type][resource] === 'number'){
					resultCost[resource] = Math.max(0, resultCost[resource] - (((costReductions[type]||{})[resource]) || 0));
				}
			}
		}
	}

	// wonders
	if(['ancient_wonder', 'modern_wonder', 'natural_wonder'].indexOf(type) > -1){
		// all wonders
		if(costReductions['allWonders']){
			for(let resource of resourceTypes){
				if(typeof costReductions['allWonders'][resource] === 'number'){
					resultCost[resource] = Math.max(0, resultCost[resource] - (((costReductions['allWonders']||{})[resource]) || 0));
				}
			}
		}
		// ancient and modern
		if(type === 'ancient_wonder' || type === 'modern_wonder'){
			if(costReductions['A_M_wonders']){
				for(let resource of resourceTypes){
					if(typeof costReductions['A_M_wonders'][resource] === 'number'){
						resultCost[resource] = Math.max(0, resultCost[resource] - (((costReductions['A_M_wonders']||{})[resource]) || 0));
					}
				}
			}
			// ancient
			if(type === 'ancient_wonder'){
				if(costReductions['A_wonders']){
					for(let resource of resourceTypes){
						if(typeof costReductions['A_wonders'][resource] === 'number'){
							resultCost[resource] = Math.max(0, resultCost[resource] - (((costReductions['A_wonders']||{})[resource]) || 0));
						}
					}
				}
			}
			// modern
			if(type === 'modern_wonder'){
				if(costReductions['M_wonders']){
					for(let resource of resourceTypes){
						if(typeof costReductions['M_wonders'][resource] === 'number'){
							resultCost[resource] = Math.max(0, resultCost[resource] - (((costReductions['M_wonders']||{})[resource]) || 0));
						}
					}
				}
			}
		}
		// natural
		if(type === 'natural_wonder'){
			if(costReductions['N_wonders']){
				for(let resource of resourceTypes){
					if(typeof costReductions['N_wonders'][resource] === 'number'){
						resultCost[resource] = Math.max(0, resultCost[resource] - (((costReductions['N_wonders']||{})[resource]) || 0));
					}
				}
			}
		}
	}
}

export const endOfTurnCleanup = (turn, playerNum, prevState) => {
	let player = prevState.players[playerNum],
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
}

export const countTypeInHand = (type, hand) => {
    // @type = 'technology', 'city', 'person', 'army', 'worker'
    console.log('you have', hand.filter(card => {
        return card().props.props.type === type;
    }).length, type, 'in hand');

    return hand.filter(card => {
        return card().props.props.type === type;
    }).length;
}

export const parseInteger = (value) => {
    switch(value){
        case undefined: 
            return 0;
        case null: 
            return 0;
        case isNaN(value):
            return 0;
        case isNaN(parseInt(value)): 
            return 0;
        default: 
            return parseInt(value);
    }
}