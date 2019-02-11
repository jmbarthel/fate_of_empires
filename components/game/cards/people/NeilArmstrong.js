import React from 'react';
import { Image } from "react-native";

export default NeilArmstrong = (props) => {
    props = {
        ...props, 
        type: 'person', 
        name: 'NeilArmstrong', 
        region: 'blue',
        cost: {
            gold: 12,
            influence: 0, 
            science: 0,
        },
        choiceCount: 2, 
        choices: {
            1: {
                produceResource: {
                    gold: 2, 
                    science: 2, 
                    influence: 2,
                }
            }, 
            2: {
                draw: 1, 
                produceResource: {
                    any: 2
                }
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/NeilArmstrong.jpg')} />
}