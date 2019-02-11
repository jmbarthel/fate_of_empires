import React from 'react';
import { Image } from "react-native";

export default KarlMarx = (props) => {
    props = {
        ...props, 
        type: 'person', 
        name: 'KarlMarx', 
        region: 'green',
        cost: {
            gold: 7,
            influence: 0, 
            science: 0,
        },
        choiceCount: 2, 
        choices: {
            1: {
                produceResource: {
                    gold: 3
                },
                reduceCost: {
                    worker: {
                        any: 1
                    }
                }
            },
            2: {
                produceResource: {
                    workerOnCapital: {
                        any: 1
                    }
                }
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/KarlMarx.jpg')} />
}