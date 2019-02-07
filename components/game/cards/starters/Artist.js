import React from 'react';
import { Image } from "react-native";

export default Artist = (props) => {
    props = {
        ...props, 
        type: 'worker', 
        name: 'Artist', 
        cost: {
            gold: 0,
            influence: 0, 
            science: 0,
            any: 5,
        },
        choiceCount: 1, 
        choices: {
            1: {
                produceResource: {
                    gold: 0,
                    science: 0, 
                    influence: 3,
                    any: 0,
                }
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/starters/Artist.jpg')} />
}