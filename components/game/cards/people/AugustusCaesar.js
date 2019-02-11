import React from 'react';
import { Image } from "react-native";

export default AugustusCaesar = (props) => {
    props = {
        ...props, 
        type: 'person', 
        name: 'AugustusCaesar', 
        region: 'yellow',
        cost: {
            gold: 7,
            influence: 0, 
            science: 0,
        },
        choiceCount: 2, 
        choices: {
            1: {
                produceResource: {
                    gold: 0,
                    science: 0, 
                    influence: 4,
                    any: 0,
                }
            },
            2: {
                produceResource: {
                    gold: 1,
                    science: 0, 
                    influence: 0,
                    any: 0,
                },
                draw: 1
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/AugustusCaesar.jpg')} />
}