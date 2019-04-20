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