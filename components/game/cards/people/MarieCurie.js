import React from 'react';
import { Image } from "react-native";

export default MarieCurie = (props) => {
    props = {
        ...props, 
        type: 'person', 
        name: 'MarieCurie', 
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
                    science: 4
                }
            },
            2: {
                produceResource: {
                    influence: 1
                },
                draw: 1
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/MarieCurie.jpg')} />
}