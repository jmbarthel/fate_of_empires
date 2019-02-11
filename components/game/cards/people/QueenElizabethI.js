import React from 'react';
import { Image } from "react-native";

export default QueenElizabethI = (props) => {
    props = {
        ...props, 
        type: 'person', 
        name: 'QueenElizabethI', 
        region: 'purple',
        cost: {
            gold: 7,
            influence: 0, 
            science: 0,
        },
        choiceCount: 2, 
        choices: {
            1: {
                produceResource: {
                    influence: 3
                }
            },
            2: {
                produceResource: {
                    gold: 3
                }
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/QueenElizabethI.jpg')} />
}