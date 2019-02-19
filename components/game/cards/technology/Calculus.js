import React from 'react';
import { Image } from "react-native";

export default Calculus = (props) => {
    props = {
        ...props, 
        type: 'technology', 
        name: 'Calculus', 
        cost: {
            gold: 0,
            influence: 0, 
            science: 10,
        },
        choiceCount: 1, 
        choices: {
            1: {
                produceResource: {
                    toward: {
                        allWonders: {
                            any: 5, 
                        }, 
                    }
                }
            },
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/technology/Calculus.jpg')} />
}