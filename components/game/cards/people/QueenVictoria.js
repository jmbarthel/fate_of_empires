import React from 'react';
import { Image } from "react-native";

export default QueenVictoria = (props) => {
    props = {
        ...props, 
        type: 'person', 
        name: 'QueenVictoria', 
        region: 'purple',
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
                    workerOnCapital: {
                        gold: 1
                    }
                },
            },
            2: {
                spendAsAny: 'influence'
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/QueenVictoria.jpg')} />
}