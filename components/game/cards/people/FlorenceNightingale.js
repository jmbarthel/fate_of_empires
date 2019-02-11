import React from 'react';
import { Image } from "react-native";

export default FlorenceNightingale = (props) => {
    props = {
        ...props, 
        type: 'person', 
        name: 'FlorenceNightingale',
        region: 'purple',  
        cost: {
            gold: 7,
            influence: 0, 
            science: 0,
        },
        choiceCount: 2, 
        choices: {
            1: {
                produceResource: {
                    science: 4, 
                }
            },
            2: {
                produceResource: {
                    eachWorkerInHand: {
                        any: 1
                    }
                }
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/FlorenceNightingale.jpg')} />
}