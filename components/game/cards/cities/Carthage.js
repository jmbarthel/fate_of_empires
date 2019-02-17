import React from 'react';
import { Image } from "react-native";

export default Carthage = (props) => {
    props = {
        ...props, 
        type: 'city', 
        name: 'Carthage', 
        cost: {
            gold: 0,
            influence: 10, 
            science: 0,
        },
        choiceCount: 2, 
        choices: {
            1: {
                produceResource: {
                    influence: 4,
                }
            },
            2: {
                produceResource: {
                    eachWorkerOnCapital: {
                        any: 1
                    }
                }
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/cities/Carthage.jpg')} />
}