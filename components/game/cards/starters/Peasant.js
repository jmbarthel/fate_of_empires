import React from 'react';
import { Image } from "react-native";

export default Peasant = (props) => {
    props = {
        ...props, 
        type: 'worker', 
        name: 'Peasant', 
        cost: {
            gold: 0,
            influence: 0, 
            science: 0,
            any: 5,
        },
        choiceCount: 1, 
        choices: {
            1: {
                produceResource: {
                    gold: 0,
                    science: 0, 
                    influence: 0,
                    any: 1,
                }
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/starters/Peasant.jpg')} />
}