import React from 'react';
import { Image } from "react-native";

export default Hypatia = (props) => {
    props = {
        ...props, 
        type: 'person', 
        name: 'Hypatia', 
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
                    science: 5
                }
            },
            2: {
                produceResource: {
                    toward: {
                        anyWonder: {
                            any: 4
                        }
                    }
                }
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/Hypatia.jpg')} />
}