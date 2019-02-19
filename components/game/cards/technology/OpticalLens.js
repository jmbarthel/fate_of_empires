import React from 'react';
import { Image } from "react-native";

export default OpticalLens = (props) => {
    props = {
        ...props, 
        type: 'technology', 
        name: 'OpticalLens', 
        cost: {
            gold: 0,
            influence: 0, 
            science: 12,
        },
        choiceCount: 1, 
        choices: {
            1: {
                produceResource: {
                    science: 5, 
                    eachPersonInHand: {
                        science: 2
                    }
                }
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/technology/OpticalLens.jpg')} />
}