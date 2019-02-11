import React from 'react';
import { Image } from "react-native";

export default EmmyNoether = (props) => {
    props = {
        ...props, 
        type: 'person', 
        name: 'EmmyNoether', 
        region: 'green',
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
                produceResource: {
                    eachScienceInHand: {
                        gold: 0, 
                        science: 0, 
                        influence: 0,
                        any: 2
                    }
                }
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/EmmyNoether.jpg')} />
}