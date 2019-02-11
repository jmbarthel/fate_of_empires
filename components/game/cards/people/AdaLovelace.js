import React from 'react';
import { Image } from "react-native";

export default AdaLovelace = (props) => {
    props = {
        ...props, 
        type: 'person', 
        name: 'AdaLovelace', 
        region: 'purple',
        cost: {
            gold: 10,
            influence: 0, 
            science: 0,
        },
        choiceCount: 2, 
        choices: {
            1: {
                produceResource: {
                    gold: 0,
                    science: 5, 
                    influence: 0,
                    any: 0,
                }
            },
            2: {
                swap: {
                    science: 'supply'
                }
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/AdaLovelace.jpg')} />
}