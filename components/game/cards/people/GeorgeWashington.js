import React from 'react';
import { Image } from "react-native";

export default GeorgeWashington = (props) => {
    props = {
        ...props, 
        type: 'person', 
        name: 'GeorgeWashington', 
        region: 'blue',
        cost: {
            gold: 7,
            influence: 0, 
            science: 0,
        },
        choiceCount: 2, 
        choices: {
            1: {
                produceResource: {
                    influence: 5
                }
            },
            2: {
                placeOnCapital: true
            }
        },
        onCapital: {
            reduceCost: {
                city: {
                    science: 3, 
                },
            }
        },
        removableFromCapital: false
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/GeorgeWashington.jpg')} />
}