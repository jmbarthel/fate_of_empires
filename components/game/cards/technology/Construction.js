import React from 'react';
import { Image } from "react-native";

export default Construction = (props) => {
    props = {
        ...props, 
        type: 'technology', 
        name: 'Construction', 
        cost: {
            gold: 0,
            influence: 0, 
            science: 8,
        },
        choiceCount: 1, 
        choices: {
            1: {
                produceResource: {
                    toward: {
                        allWonders: {
                            any: 4
                        }
                    }
                }
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/technology/Construction.jpg')} />
}