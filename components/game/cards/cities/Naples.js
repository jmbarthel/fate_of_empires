import React from 'react';
import { Image } from "react-native";

export default Naples = (props) => {
    props = {
        ...props, 
        type: 'city', 
        name: 'Naples', 
        cost: {
            gold: 0,
            influence: 6, 
            science: 0,
        },
        choiceCount: 2, 
        choices: {
            1: {
                produceResource: {
                    influence: 2,
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
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/cities/Naples.jpg')} />
}