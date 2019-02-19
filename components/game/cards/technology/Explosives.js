import React from 'react';
import { Image } from "react-native";

export default Explosives = (props) => {
    props = {
        ...props, 
        type: 'technology', 
        name: 'Explosives', 
        cost: {
            gold: 0,
            influence: 0, 
            science: 8,
        },
        choiceCount: 1, 
        choices: {
            1: {
                produceResource: {
                    science: 3
                },
                // you may exile a card from your hand or capital
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/technology/Explosives.jpg')} />
}