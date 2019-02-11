import React from 'react';
import { Image } from "react-native";

export default JohannSebastianBach = (props) => {
    props = {
        ...props, 
        type: 'person', 
        name: 'JohannSebastianBach', 
        region: 'green',
        cost: {
            gold: 10,
            influence: 0,
            science: 0,
        },
        choiceCount: 2, 
        choices: {
            1: {
                produceResource: {
                    any: 3
                }
            },
            2: {
                produceResource: {
                    eachPersonInHand: {
                        influence: 3
                    }
                }
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/JohannSebastianBach.jpg')} />
}