import React from 'react';
import { Image } from "react-native";

export default Pottery = (props) => {
    props = {
        ...props, 
        type: 'technology', 
        name: 'Pottery', 
        cost: {
            gold: 0,
            influence: 0, 
            science: 6,
        },
        choiceCount: 1, 
        choices: {
            1: {
                produceResource: {
                    science: 1, 
                    gold: 2
                }
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/technology/Pottery.jpg')} />
}