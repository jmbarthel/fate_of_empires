import React from 'react';
import { Image } from "react-native";

export default Oxford = (props) => {
    props = {
        ...props, 
        type: 'city', 
        name: 'Oxford', 
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
                    workerOnCapital: {
                        any: 1
                    }
                }
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/cities/Oxford.jpg')} />
}