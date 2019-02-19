import React from 'react';
import { Image } from "react-native";

export default Gunpowder = (props) => {
    props = {
        ...props, 
        type: 'technology', 
        name: 'Gunpowder', 
        cost: {
            gold: 0,
            influence: 0, 
            science: 8,
        },
        choiceCount: 1, 
        choices: {
            1: {
                produceResource: {
                    science: 2,
                    influence: 3
                }
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/technology/Gunpowder.jpg')} />
}