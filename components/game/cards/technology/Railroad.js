import React from 'react';
import { Image } from "react-native";

export default Railroad = (props) => {
    props = {
        ...props, 
        type: 'technology', 
        name: 'Railroad', 
        cost: {
            gold: 0,
            influence: 0, 
            science: 8,
        },
        choiceCount: 1, 
        choices: {
            1: {
                produceResource: {
                    science: 3, 
                    gold: 2
                }
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/technology/Railroad.jpg')} />
}