import React from 'react';
import { Image } from "react-native";

export default GeneticEngineering = (props) => {
    props = {
        ...props, 
        type: 'technology', 
        name: 'GeneticEngineering', 
        cost: {
            gold: 0,
            influence: 0, 
            science: 12,
        },
        choiceCount: 1, 
        choices: {
            1: {
                produceResource: {
                    gold: 4,
                    science: 2,
                }
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/technology/GeneticEngineering.jpg')} />
}