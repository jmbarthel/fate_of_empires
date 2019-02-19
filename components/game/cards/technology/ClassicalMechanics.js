import React from 'react';
import { Image } from "react-native";

export default ClassicalMechanics = (props) => {
    props = {
        ...props, 
        type: 'technology', 
        name: 'ClassicalMechanics', 
        cost: {
            gold: 0,
            influence: 0, 
            science: 8,
        },
        choiceCount: 1, 
        choices: {
            1: {
                draw: 1,
                produceResouce: {
                    toward: {
                        technology: {
                            science: 3
                        }
                    }
                }
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/technology/ClassicalMechanics.jpg')} />
}