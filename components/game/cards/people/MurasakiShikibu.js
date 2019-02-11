import React from 'react';
import { Image } from "react-native";

export default MurasakiShikibu = (props) => {
    props = {
        ...props, 
        type: 'person', 
        name: 'MurasakiShikibu', 
        region: 'red',
        cost: {
            gold: 7,
            influence: 0, 
            science: 0,
        },
        choiceCount: 0, 
        choices: {
            1: {
                produceResource: {
                    any: 2
                }
            }, 
            2: {
                produceResource: {
                    eachPersonInHand: {
                        any: 2
                    }
                }
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/MurasakiShikibu.jpg')} />
}