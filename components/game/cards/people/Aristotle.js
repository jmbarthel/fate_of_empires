import React from 'react';
import { Image } from "react-native";

export default Aristotle = (props) => {
    props = {
        ...props, 
        type: 'person', 
        name: 'Aristotle', 
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
                    science: 4, 
                    influence: 0,
                    any: 0,
                }
            },
            2: {
                reduceCost: {
                    city: {
                        gold: 3, 
                    },
                }
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/Aristotle.jpg')} />
}