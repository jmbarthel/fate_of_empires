import React from 'react';
import { Image } from "react-native";

export default Sappho = (props) => {
    props = {
        ...props, 
        type: 'person', 
        name: 'Sappho', 
        region: 'yellow',
        cost: {
            gold: 10,
            influence: 0, 
            science: 0,
        },
        choiceCount: 2, 
        choices: {
            1: {
                produceResource: {
                    influence: 5,
                }
            },
            2: {
                produceResource: {
                    eachPersonInHand: {
                        any: 3
                    }
                }
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/Sappho.jpg')} />
}