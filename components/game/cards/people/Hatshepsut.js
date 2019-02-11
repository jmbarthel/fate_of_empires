import React from 'react';
import { Image } from "react-native";

export default Hatshepsut = (props) => {
    props = {
        ...props, 
        type: 'person', 
        name: 'Hatshepsut', 
        region: 'yellow',
        cost: {
            gold: 12,
            influence: 0, 
            science: 0,
        },
        choiceCount: 2, 
        choices: {
            1: {
                produceResource: {
                    gold: 2, 
                    science: 2, 
                    influence: 2
                }
            },
            2: {
                produceResource: {
                    toward: {
                        anyWonder: {
                            influence: 8
                        }
                    }
                }
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/Hatshepsut.jpg')} />
}