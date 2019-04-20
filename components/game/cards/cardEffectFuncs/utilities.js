import { shuffle } from '../../../utils/utilities.js';
import { countTypeInHand } from '../../../utils/utilities.js';

// ALL Functions here should have card, playerNumber, state as the last two arguments, so that proper binding of arguments can occur

export const gainResources = (resourceObj, card, playerNumber, state) => {
    /*
        This function takes the state, adds the requisite resources to the player resources, then returns the state

        resourceObj = {
            gold: 1,
            science: 2, 
            influence: 3, 
            any: 4,
            toward: {

            }
        }
    */

    let currentResources = state.players[playerNumber].resources;
   
    // If any of the resource types are omitted from the resource object, add defaults here
    let resourceTypes = ['gold', 'science', 'influence', 'any'];

    resourceTypes.forEach((type) => {
        if(!resourceObj[type]){
            resourceObj[type] = 0;
        }
    })

    if(!resourceObj.toward){
        resourceObj.toward = {};
    }

    let towardTypes = ['person', 'technology', 'city', 'A_M_wonders', 'N_wonders', 'allWonders', 'yourRegion', 'otherRegion'];

    towardTypes.forEach((type) => {
        if(!resourceObj.toward[type]){
            resourceObj.toward[type] = {
                gold: 0, 
                science: 0, 
                influence: 0,
                any: 0,
            }
        }
    });

    return playCard(card, playerNumber, {
        ...state, 
        players: {
            ...state.players, 
            [playerNumber]: {
                ...state.players[playerNumber], 
                resources: {
                    gold: currentResources.gold + resourceObj.gold,
                    science: currentResources.science + resourceObj.science,
                    influence: currentResources.influence + resourceObj.influence,
                    any: currentResources.any + resourceObj.any,
                    toward: {
						person: {
							gold: currentResources.toward.person.gold + resourceObj.toward.person.gold, 
							science: currentResources.toward.person.science + resourceObj.toward.person.science, 
							influence: currentResources.toward.person.influence + resourceObj.toward.person.influence,
							any: currentResources.toward.person.any + resourceObj.toward.person.any,
						}, 
						technology: {
							gold: currentResources.toward.technology.gold + resourceObj.toward.technology.gold, 
							science: currentResources.toward.technology.science + resourceObj.toward.technology.science, 
							influence: currentResources.toward.technology.influence + resourceObj.toward.technology.influence,
							any: currentResources.toward.technology.any + resourceObj.toward.technology.any,
						}, 
						city: {
							gold: currentResources.toward.city.gold + resourceObj.toward.city.gold, 
							science: currentResources.toward.city.science + resourceObj.toward.city.science, 
							influence: currentResources.toward.city.influence + resourceObj.toward.city.influence,
							any: currentResources.toward.city.any + resourceObj.toward.city.any,
						}, 
						A_M_wonders: {
							gold: currentResources.toward.A_M_wonders.gold + resourceObj.toward.A_M_wonders.gold, 
							science: currentResources.toward.A_M_wonders.science + resourceObj.toward.A_M_wonders.science, 
							influence: currentResources.toward.A_M_wonders.influence + resourceObj.toward.A_M_wonders.influence,
							any: currentResources.toward.A_M_wonders.any + resourceObj.toward.A_M_wonders.any,
						}, 
						N_wonders: {
							gold: currentResources.toward.N_wonders.gold + resourceObj.toward.N_wonders.gold, 
							science: currentResources.toward.N_wonders.science + resourceObj.toward.N_wonders.science, 
							influence: currentResources.toward.N_wonders.influence + resourceObj.toward.N_wonders.influence,
							any: currentResources.toward.N_wonders.any + resourceObj.toward.N_wonders.any,
						}, 
						allWonders: {
							gold: currentResources.toward.allWonders.gold + resourceObj.toward.allWonders.gold, 
							science: currentResources.toward.allWonders.science + resourceObj.toward.allWonders.science, 
							influence: currentResources.toward.allWonders.influence + resourceObj.toward.allWonders.influence,
							any: currentResources.toward.allWonders.any + resourceObj.toward.allWonders.any,
						},
						yourRegion: {
							gold: currentResources.toward.yourRegion.gold + resourceObj.toward.yourRegion.gold, 
							science: currentResources.toward.yourRegion.science + resourceObj.toward.yourRegion.science, 
							influence: currentResources.toward.yourRegion.influence + resourceObj.toward.yourRegion.influence, 
							any: currentResources.toward.yourRegion.any + resourceObj.toward.yourRegion.any
						},
						otherRegion: {
							gold: currentResources.toward.otherRegion.gold + resourceObj.toward.otherRegion.gold, 
							science: currentResources.toward.otherRegion.science + resourceObj.toward.otherRegion.science, 
							influence: currentResources.toward.otherRegion.influence + resourceObj.toward.otherRegion.influence, 
							any: currentResources.toward.otherRegion.any + resourceObj.toward.otherRegion.any
						}
					}
                }
            }
        }
    })
}

export const gainResourcesPer = (numResourcesPer, typeResource, perWhat, card, playerNumber, state) => {
    /*
        This function multiplies the resources produced by the number of items fulfilling the perWhat

        e.g. 
        numResourcesPer = 2
        typeResource = 'influence'
        perWhat = 'eachWorkerOnCapital'

        gives 2 influence per worker on your capital
    */

    let resource = 0;

    //eachworkeroncapital
    if(perWhat === 'eachWorkerOnCapital'){
        console.log('produce resource per worker on capital')
        resource = numResourcesPer * state.players[playerNumber].capital.workers.length;
    }

    //eachPersonInHand
    if(perWhat === 'eachPersonInHand'){
        console.log('evaluating each person in hand');

        resource = numResourcesPer * countTypeInHand('person', state.players[playerNumber].hand);
    }

    //eachTechInHand
    if(perWhat === 'eachTechInHand'){
        console.log('evaluating each tech in hand');
        resource = numResourcesPer * countTypeInHand('technology', state.players[playerNumber].hand);
    }

    //eachWorkerInHand
    if(perWhat === 'eachWorkerInHand'){
        console.log('evaluating each worker in hand');

        resource = numResourcesPer * countTypeInHand('worker', state.players[playerNumber].hand);
    }

    //eachCityInHand
    if(perWhat === 'eachCityInHand'){
        console.log('evaluating each city in hand');

        resource = numResourcesPer * countTypeInHand('city', state.players[playerNumber].hand);
    }

    return playCard(card, playerNumber, {
        ...state, 
        players: {
            ...state.players, 
            [playerNumber]: {
                ...state.players[playerNumber],
                resources: {
                    ...state.players[playerNumber].resources, 
                    [typeResource]: state.players[playerNumber].resources[typeResource] + resource
                }
            }
        }
    })
}

export const gainResourcesCondition = (typeOfCard, whereIsCard, resourceObj, card, playerNumber, state) => {
    // Cleopatra: 'person', 'inHand', {gold: 1})
    if(whereIsCard === 'inHand'){
        if(countTypeInHand(typeOfCard, state.players[playerNumber].hand) > 0){
            return playCard(card, playerNumber, {
                ...state, 
                players: {
                    ...state.players, 
                    [playerNumber]: {
                        ...state.players[playerNumber], 
                        resources: {
                            ...state.players[playerNumber].resources, 
                            gold: (resourceObj.gold ? state.players[playerNumber].resources.gold + resourceObj.gold : state.players[playerNumber].resources.gold),
                            science: (resourceObj.science ? state.players[playerNumber].resources.science + resourceObj.science : state.players[playerNumber].resources.science),
                            influence: (resourceObj.influence ? state.players[playerNumber].resources.influence + resourceObj.influence : state.players[playerNumber].resources.influence),
                        }
                    }
                }
            })
        }
        // HuaMulan
    } else if(whereIsCard === 'srinivasa'){
        // SRINIVASA
        return state;
    } else{
        return state;
    }

}

export const drawCard = (card, playerNumber, state) => {
    /*
        This function draws a card from the designated player's deck and adds it to their hand.

        playerNumber = integer between 0 and (number of players - 1)
    */

    let hand = state.players[playerNumber].hand;
    let deck = state.players[playerNumber].deck;
    let discard = state.players[playerNumber].discard;

    if(deck.length === 0){
        // Shuffle discard pile into deck first
        deck = deck.concat(discard);
	
        discard = [];

        deck = shuffle(deck);
    }

    if(deck.length > 0){
        // After shuffling the discard if there are still no cards in the deck, don't draw at all
        hand.push(deck.pop());
    }

    return {
        ...state, 
        players: {
            ...state.players, 
            [playerNumber]: {
                ...state.players[playerNumber],
                hand, 
                deck, 
                discard,
            }
        }
    }
}

export const advanceTime = (numberOfAdvanceTimes, card, playerNumber, state) => {
    return {
        ...state, 
        advanceTimeInProgress: playerNumber, 
    }
}

export const revealFromTopandDrawOne = (card, playerNumber, state) => {
    // astronomy - draw a card, reveal the top card you may buy it for 4 less anymix
    return {
        ...state, 
    }
}

/**
 * Used by playCard
 */
const removeCardFromHandAndAddToPlayedCards = (card, playerNumber, state) => {

    let played_cards = state.players[playerNumber].played_cards.concat(state.players[playerNumber].hand.splice(card.props.props.num, 1));

    return {
        ...state, 
        players: {
            ...state.players, 
            [playerNumber]: {
                ...state.players[playerNumber],
                played_cards: played_cards, 
            }
        }
    }
}

/**
 * Used by playCard
 */
const removeCardFromCapitalAndAddToPlayedCards = (card, playerNumber, state) => {
    let played_cards; 

    if(card.props.props.type === 'worker'){
        played_cards = state.players[playerNumber].played_cards.concat(state.players[playerNumber].capital.workers.splice(card.props.props.num, 1));
    } else if(card.props.props.type === 'army'){
        played_cards = state.players[playerNumber].played_cards.concat(state.players[playerNumber].capital.armies.splice(card.props.props.num, 1));
    } else{
        played_cards = state.players[playerNumber].played_cards.concat(state.players[playerNumber].capital.other.splice(card.props.props.num, 1));
    }

    return {
        ...state, 
        players: {
            ...state.players, 
            [playerNumber]: {
                ...state.players[playerNumber],
                played_cards: played_cards, 
            }
        }
    }
}

/**
 * Removes a card from the relevant location and adds to the played cards
 */
export const playCard = (card, playerNumber, state) => {
    if(!card.props.props.capital){
        return removeCardFromHandAndAddToPlayedCards(card, playerNumber, state);
    } else {
        return removeCardFromCapitalAndAddToPlayedCards(card, playerNumber, state);
    }
}

/**
 * Simply removes a card from the hand of the passed in players hand
 */
const removeCardFromHand = (card, playerNumber, state) => {
    state.players[playerNumber].hand.splice(card.props.props.num, 1);

    return state;
}

/**
 * Places the card on the capital 
 */
export const placeOnCapital = (callbacks, card, playerNumber, state) => {

    // GEORGE WASHINGTON

    // if already on capital, don't allow
    if(card.props.props.capital){
        alert('Already on capital.');
        return state;
    }

    return removeCardFromHand(card, playerNumber, {
        ...state, 
        callbacks: state.callbacks.concat(callbacks),
        players: {
            ...state.players,
            [playerNumber]: {
                ...state.players[playerNumber],
                capital: {
                    ...state.players[playerNumber].capital,
                    other: state.players[playerNumber].capital.other.concat([card])
                }
            }
        }
    });
    
}

export const reduceCost = (type, resource, amount, permanent, card, playerNumber, state) => {
    // Aristotle 'person', 'gold', 3
    // Pocahontas 'person', 'gold', 3
    if(permanent){
        return playCard(card, playerNumber, {
            ...state, 
            temporary_cost_reductions: {
                ...state.temporary_cost_reductions,
                [playerNumber]: {
                    ...state.permanent_cost_reductions[playerNumber],
                    [type]: {
                        ...state.permanent_cost_reductions[playerNumber].type,
                        [resource]: ((state.permanent_cost_reductions[playerNumber][type]||{})[resource]||0) + amount, 
                    },
                }
            }
        })
    } else{
        return playCard(card, playerNumber, {
            ...state, 
            temporary_cost_reductions: {
                ...state.temporary_cost_reductions,
                [playerNumber]: {
                    ...state.temporary_cost_reductions[playerNumber],
                    [type]: {
                        ...state.temporary_cost_reductions[playerNumber].type,
                        [resource]: ((state.temporary_cost_reductions[playerNumber][type]||{})[resource]||0) + amount, 
                    },
                }
            }
        })
    }
}

export const validatePickedCard = (validationOptions, card, playerNumber, state) => {


}

export const pickACard = (fromOptions, callbackArray, card, playerNumber, state) => {
    // THEORY OF EVOLUTION: You may exile this or a card you played this turn 
    // To buy a card from the supply area that shares the same type
    // fromOptions: this or played cards
    // callbacks array: [validatePickedCard, pickACard.bind(supply area, [buyCard])]

    // ASTRONOMY: Pick top card of supply - buy it for 4 fewer any mix this turn
    // fromOptions: top card
    // callbacks array: [validatePickedCard, pickACard.bind(supply area, [buyCard])]

    // SANITATION: discard or exile a card from hand or capital: 7 science
    // fromOptions: hand, 
    // callbacks : [pick option (discard or exile)]

}

const getLocationFunc = (location) => {
    switch(location){
        case 'supply':
            return highlightSupply;
        case 'hand':
            return highlightHand;
        case 'wonder':
            return highlightWonder;
        case 'capital':
            return highlightCapital;
        case 'handOrCapital': 
            return highlightHandOrCapital;
    }

}

export const swapACardSetupFunc = (location1, location2, typeOfCard, card, playerNumber, state) => {
    // basically we want to set up an array of callbacks that do the following: 
    /*
        1. highlight your hand
        2. store the card you have chosen
        3. highlight the location ('supply')
        4. swap the card in the hand for the card you have chosen from the location ('supply')
    */

    // ADA LOVELACE: swap a science in your hand for one in the supply
    // from options : hand
    // callbacks: [pickacard(supplyarea, [swap])]
    let func1 = getLocationFunc(location1), 
        func2 = getLocationFunc(location2);

    return {
        ...state, 
        typeToChoose: typeOfCard,
        callbacks: [
            func1, 
            func2, 
            swapCard.bind(this, location1, location2)
        ]
    }
}

export const exileCardSetupFunc = (location1, location2, type1, type2, card, playerNumber, state) => {
    // HARRIET TUBMAN: this, 'handOrCapital', 'supply', 'any', 'worker'
    // Exile a card from your hand or capital to by a worker from the supply for free

    let func1 = getLocationFunc(location1),
        tempFunc2 = getLocationFunc(location2);
        func2 = (card, player, state) => {
            return tempFunc2({
                ...state, 
                typeToChoose: type2
            })
        }
    
    return playCard(card, playerNumber, {
        ...state,
        typeToChoose: type1, 
        callbacks: [
            func1, 
            func2, 
            exileToObtain.bind(this, location1, location2)
        ]
    });
}

const highlightSupply = (card, player, state) => {
    console.log('highlightSupply')
    return {
        ...state, 
        highlightSupply: true,
        highlightHand: false,
        highlightWonder: false,
        highlightCapital: false,
    }
}
const highlightHand = (card, player, state) => {
    console.log('highlightHand')
    return {
        ...state, 
        highlightSupply: false,
        highlightHand: true,
        highlightWonder: false,
        highlightCapital: false,
    }
}
const highlightWonder = (card, player, state) => {
    console.log('highlightWonder')
    return {
        ...state, 
        highlightSupply: false,
        highlightHand: false,
        highlightWonder: true,
        highlightCapital: false,
    }
}
const highlightCapital = (card, player, state) => {
    console.log('highlightCapital')
    return {
        ...state, 
        highlightSupply: false,
        highlightHand: false,
        highlightWonder: false,
        highlightCapital: true,
    }
}
const highlightHandOrCapital = (card, player, state) => {
    console.log('highlightHandOrCapital')
    return {
        ...state, 
        highlightSupply: false,
        highlightHand: true,
        highlightWonder: false,
        highlightCapital: true,
    }
}

export const swapCard = (location1, location2, card, playerNumber, state) => {
    let keys = {
        'supply' : 'supplyRevealed', 
        'hand': ['players', playerNumber, 'hand'],
        'wonders': 'wondersRevealed'
    }
    let card1 = state.storedCard1, card2 = state.storedCard2;

    console.log('SWAPPING: ', card1.props.props.name, 'FOR: ', card2.props.props.name, 'FROM: ', location1, 'TO: ', location2);

    if(card1.props.props.capital){
        if(card1.props.props.type === 'worker'){
            keys.capital = ['players', playerNumber, 'capital', 'workers'];
        } else if(card1.props.props.type === 'army'){
            keys.capital = ['players', playerNumber, 'capital', 'armies'];
        } else{
            keys.capital = ['players', playerNumber, 'capital', 'other']
        }
    } else if(card2.props.props.capital){
        if(card2.props.props.type === 'worker'){
            keys.capital = ['players', playerNumber, 'capital', 'workers'];
        } else if (card2.props.props.type === 'army'){
            keys.capital = ['players', playerNumber, 'capital', 'armies'];
        } else{
            keys.capital = ['players', playerNumber, 'capital', 'other']
        }
    }

    let locationOne = state;
    let locationTwo = state;

    // Gets the proper locations of the arrays holding the cards to swap

    if(!Array.isArray(keys[location1])){
        locationOne = locationOne[keys[location1]];
    } else{
        while(keys[location1].length){
            locationOne = locationOne[keys[location1].shift()];
        }
    }

    if(!Array.isArray(keys[location2])){
        locationTwo = locationTwo[keys[location2]];
    } else{
        while(keys[location2].length){
            locationTwo = locationTwo[keys[location2].shift()];
        }
    }

    locationOne.splice(card1.props.props.num, 1, card2);
    locationTwo.splice(card2.props.props.num, 1, card1);

    return {
        ...state, 
        typeToChoose: null,
        storedCard1: null, 
        storedCard2: null,
        highlightCapital: false, 
        highlightSupply: false, 
        highlightHand: false, 
        highlightWonders: false, 
        
        expandSupplyCard: false, 
        expandedSupplyCard: false,
        expandWonderCard: false, 
        expandedWonderCard: false,
        expandHandCard: false, 
        expandedHandCard: false,

        expandedCapital: false,
    }
}

export const exileToObtain = (location1, location2, card, playerNumber, state) => {
    // card 1 is the one being exiled, card2 is the one being purchased

    let keys = {
        'supply' : 'supplyRevealed', 
        'hand': ['players', playerNumber, 'hand'],
        'wonders': 'wondersRevealed',
        'handOrCapital': ['players', playerNumber, 'playedCards']
    }

    let card1 = state.storedCard1, card2 = state.storedCard2;

    console.log('Exiling: ', card1.props.props.name, 'FOR: ', card2.props.props.name, 'FROM: ', location1, 'TO: ', location2);

    // Set up the location path for the first card (that we are exiling)
    if(card1.props.props.capital){
        if(card1.props.props.type === 'worker'){
            keys.capital = ['players', playerNumber, 'capital', 'workers'];
        } else if(card1.props.props.type === 'army'){
            keys.capital = ['players', playerNumber, 'capital', 'armies'];
        } else{
            keys.capital = ['players', playerNumber, 'capital', 'other']
        }
    }

    let locationOne = state;
    let locationTwo = state;

    // Gets the proper locations of the arrays holding the cards to swap
    if(!Array.isArray(keys[location1])){
        locationOne = locationOne[keys[location1]];
    } else{
        while(keys[location1].length){
            locationOne = locationOne[keys[location1].shift()];
        }
    }

    if(card2.props.props.type === 'worker'){
        // If it is a worker, just add the card to the played cards
        state.players[playerNumber].playedCards.push(
            card2
        ); // Place the card 2 into the players played cards for the turn  
    } else{
        // Otherwise, remove it from the present location and add it to the played cards
        if(card2.props.props.capital){
            if(card2.props.props.type === 'worker'){
                keys.capital = ['players', playerNumber, 'capital', 'workers'];
            } else if (card2.props.props.type === 'army'){
                keys.capital = ['players', playerNumber, 'capital', 'armies'];
            } else{
                keys.capital = ['players', playerNumber, 'capital', 'other']
            }

        }

        if(!Array.isArray(keys[location2])){
            locationTwo = locationTwo[keys[location2]];
        } else{
            while(keys[location2].length){
                locationTwo = locationTwo[keys[location2].shift()];
            }
        }

        state.players[playerNumber].playedCards.push(
            locationTwo.splice(card2.props.props.num, 1)
        ); // Place the card 2 into the players played cards for the turn        
    }

    locationOne.splice(card1.props.props.num, 1); // exile the card (splice it out of existence)

    return {
        ...state, 
        typeToChoose: null,
        storedCard1: null, 
        storedCard2: null,
        highlightCapital: false, 
        highlightSupply: false, 
        highlightHand: false, 
        highlightWonders: false, 
        
        expandSupplyCard: false, 
        expandedSupplyCard: false,
        expandWonderCard: false, 
        expandedWonderCard: false,
        expandHandCard: false, 
        expandedHandCard: false,

        expandedCapital: false,
    }

}

export const spendAsAny = (type, card, playerNumber, state) => {
    // Queen Victoria
}