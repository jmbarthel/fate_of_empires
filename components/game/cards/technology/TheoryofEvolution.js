import React from 'react';
import { Image } from "react-native";

export default TheoryofEvolution = (props) => {
    props = {
        ...props, 
        type: 'technology', 
        name: 'TheoryofEvolution', 
        cost: {
            gold: 0,
            influence: 0, 
            science: 12,
        },
        choiceCount: 1, 
        choices: {
            1: {
                // You may exile this or a card you played this turn 
                // To buy a card from the supply area that shares the same type
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/technology/TheoryofEvolution.jpg')} />
}