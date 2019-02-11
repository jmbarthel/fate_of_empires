import React from 'react';
import { Image } from "react-native";

export default LeifErikson = (props) => {
    props = {
        ...props, 
        type: 'person', 
        name: 'LeifErikson', 
        region: 'green',
        cost: {
            gold: 7,
            influence: 0, 
            science: 0,
        },
        choiceCount: 2, 
        choices: {
            1: {
                produceResource: {
                    gold: 3
                }
            },
            2: {
                produceResource: {
                    toward: {
                        N_wonders: {
                            any: 5
                        }
                    }
                }
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/LeifErikson.jpg')} />
}