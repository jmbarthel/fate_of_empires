import React from 'react';
import { Image } from "react-native";

export default Currency = (props) => {
    props = {
        ...props, 
        type: 'technology', 
        name: 'Currency', 
        cost: {
            gold: 0,
            influence: 0, 
            science: 10,
        },
        choiceCount: 1, 
        choices: {
            1: {
                produceResource: {
                    gold: 3, 
                    science: 3
                }
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/technology/Currency.jpg')} />
}