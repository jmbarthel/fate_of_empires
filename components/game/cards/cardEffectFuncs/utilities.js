import { shuffle } from '../../../utils/utilities.js';
import { countTypeInHand } from '../../../utils/utilities.js';
import { State } from 'react-native-gesture-handler';

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
        resource = numResourcesPer * state.player[playerNumber].capital.workers.length;
    }

    //eachPersonInHand
    if(perWhat === 'eachPersonInHand'){
        console.log('evaluating each person in hand');

        resource = numResourcesPer * countTypeInHand(perWhat, state.players[playerNumber].hand);
    }

    //eachTechInHand
    if(perWhat === 'eachTechInHand'){
        console.log('evaluating each tech in hand');
        resource = numResourcesPer * countTypeInHand(perWhat, state.players[playerNumber].hand);
    }

    //eachWorkerInHand
    if(perWhat === 'eachWorkerInHand'){
        console.log('evaluating each worker in hand');

        resource = numResourcesPer * countTypeInHand(perWhat, state.players[playerNumber].hand);
    }

    //eachCityInHand
    if(perWhat === 'eachCityInHand'){
        console.log('evaluating each city in hand');

        resource = numResourcesPer * countTypeInHand(perWhat, state.players[playerNumber].hand);
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
        if(countTypeInHand(typeOfCard, state.player[playerNumber].hand) > 0){
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

export const exileCard = (location, numOfCards, callbackArray, card, playerNumber, state) => {
    if(location === 'thisCard'){
        // ANASTASIA +10 inf and exile her

    } else if(location === 'handOrCapital'){
        if(numOfCards === 1){
            // hARRIET TUBMAN - exile card from hand or capital to buy a worker for free

            // Nelson Mandela - exile card from hand or capital to buy a worker for free
        } else if(numOfCards > 1){
            // Genghis KHAN  exile up to 2 cards from hand or capital and buy a worker for free

        }
    }

    return {
        ...state
    };




    
}

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

export const playCard = (card, playerNumber, state) => {
    if(!card.props.props.capital){
        return removeCardFromHandAndAddToPlayedCards(card, playerNumber, state);
    } else {
        return removeCardFromCapitalAndAddToPlayedCards(card, playerNumber, state);
    }
}

const removeCardFromHand = (card, playerNumber, state) => {
    state.players[playerNumber].hand.splice(card.props.props.num, 1);

    return state;
}

export const placeOnCapital = (card, playerNumber, state) => {

    // GEORGE WASHINGTON

    // if already on capital, don't allow
    if(card.props.props.capital){
        alert('Already on capital.');
        return state;
    }

    return removeCardFromHand(card, playerNumber, {
        ...state, 
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
    })
    
}

export const reduceCost = (type, resource, amount, card, playerNumber, state) => {

    // Aristotle

    // Pocahontas

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

    // ADA LOVELACE: swap a science in your hand for one in the supply
    // from options : hand
    // callbacks: [pickacard(supplyarea, [swap])]
}

export const spendAsAny = (type, card, playerNumber, state) => {
    // Queen Victoria
}