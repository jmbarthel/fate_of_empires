export const gainResources = (resourceObj, prevState, playerNumber) => {
    /*
        resourceObj = {
            gold: 1,
            science: 2, 
            influence: 3, 
            any: 4
        }
    */

    return {
        ...prevState, 
        players: {
            ...prevState.players, 
            [playerNumber]: {
                ...prevState.players[playerNumber], 
                resources: {
                    gold: prevState.players[playerNumber].resources.gold + resourceObj.gold,
                    science: prevState.players[playerNumber].resources.science + resourceObj.science,
                    influence: prevState.players[playerNumber].resources.influence + resourceObj.influence,
                    any: prevState.players[playerNumber].resources.any + resourceObj.any,
                }
            }
        }
    }
}

export const drawCard = (prevState, playerNumber) => {
    /*
        playerNumber = integer between 0 and number of players - 1
    */

    let hand = prevState.players[playerNumber].hand;
    let deck = prevState.players[playerNumber].deck;

    return {
        ...prevState, 
        players: {
            ...prevState.players, 
            [playerNumber]: {
                ...prevState.players[playerNumber]
            }
        }
    }
}