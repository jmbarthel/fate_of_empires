import React from 'react';
import { Image } from "react-native";

export default Electronics = (props) => {
    props = {
        ...props, 
        type: 'technology', 
        name: 'Electronics', 
        cost: {
            gold: 0,
            influence: 0, 
            science: 8,
        },
        choiceCount: 1, 
        choices: {
            1: {
                draw: 1, 
                produceResource: {
                    eachTechInHand: {
                        science: 1
                    }
                }
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/technology/Electronics.jpg')} />
}