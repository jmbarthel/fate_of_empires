import React from 'react';
import { Image } from "react-native";

export default Pasteurization = (props) => {
    props = {
        ...props, 
        type: 'technology', 
        name: 'Pasteurization', 
        cost: {
            gold: 0,
            influence: 0, 
            science: 12,
        },
        choiceCount: 1, 
        choices: {
            1: {
                draw: 1,
                produceResource: {
                    eachWorkerOnCapital: {
                        any: 1
                    } 
                }
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/technology/Pasteurization.jpg')} />
}