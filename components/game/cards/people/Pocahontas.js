import React from 'react';
import { Image } from "react-native";

export default Pocahontas = (props) => {
    props = {
        ...props, 
        type: 'person', 
        name: 'Pocahontas', 
        region: 'blue',
        cost: {
            gold: 7,
            influence: 0, 
            science: 0,
        },
        choiceCount: 2, 
        choices: {
            1: {
                produceResource: {
                    any: 2
                }
            },
            2: {
                reduceCost: {
                    person: {
                        gold: 3
                    }
                }
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/Pocahontas.jpg')} />
}