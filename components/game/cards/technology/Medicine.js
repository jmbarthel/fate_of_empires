import React from 'react';
import { Image } from "react-native";

export default Medicine = (props) => {
    props = {
        ...props, 
        type: 'technology', 
        name: 'Medicine', 
        cost: {
            gold: 0,
            influence: 0, 
            science: 8,
        },
        choiceCount: 1, 
        choices: {
            1: {
                draw: 1, 
                produceResource: {
                    toward: {
                        person: {
                            gold: 3
                        }
                    }
                }
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/technology/Medicine.jpg')} />
}