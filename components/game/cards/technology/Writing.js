import React from 'react';
import { Image } from "react-native";

export default Writing = (props) => {
    props = {
        ...props, 
        type: 'technology', 
        name: 'Writing', 
        cost: {
            gold: 0,
            influence: 0, 
            science: 6,
        },
        choiceCount: 1, 
        choices: {
            1: {
                produceResource: {
                    science: 2,
                    gold: 1,
                }
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/technology/Writing.jpg')} />
}