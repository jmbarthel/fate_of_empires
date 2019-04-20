
// Cards
import Peasant from '../game/cards/starters/Peasant.js';
import HumanitarianAid from '../game/cards/starters/HumanitarianAid.js';

// Setup
import assembleSupplyDeck from '../utils/assemble_supply_cards.js';
import assembleWonderDeck from '../utils/assemble_wonder_cards.js';

import { shuffle } from './utilities.js';

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

        highlightSupply: false,
        highlightHand: true,
        highlightCapital: true,

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
