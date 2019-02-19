import React from 'react';
import { Image } from "react-native";

export default Miniaturization = (props) => {
    props = {
        ...props, 
        type: 'technology', 
        name: 'Miniaturization', 
        cost: {
            gold: 0,
            influence: 0, 
            science: 10,
        },
        choiceCount: 1, 
        choices: {
            1: {
                produceResource: {
                    science: 3, 
                    influence: 3
                }
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/technology/Miniaturization.jpg')} />
}