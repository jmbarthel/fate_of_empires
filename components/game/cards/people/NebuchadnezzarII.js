import React from 'react';
import { Image } from "react-native";

export default NebuchadnezzarII = (props) => {
    props = {
        ...props, 
        type: 'person', 
        name: 'NebuchadnezzarII', 
        region: 'red',
        cost: {
            gold: 7,
            influence: 0, 
            science: 0,
        },
        choiceCount: 2, 
        choices: {
            1: {
                produceResource: {
                    science: 3
                }
            },
            2: {
                produceResource: {
                    influence: 3
                }
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/NebuchadnezzarII.jpg')} />
}