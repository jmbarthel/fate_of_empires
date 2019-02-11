import React from 'react';
import { Image } from "react-native";

export default DwightDEisenhower = (props) => {
    props = {
        ...props, 
        type: 'person', 
        name: 'DwightDEisenhower', 
        region: 'blue',
        cost: {
            gold: 0,
            influence: 3, 
            science: 0,
        },
        choiceCount: 2, 
        choices: {
            1: {
                produceResource: {
                    gold: 3, 
                    science: 3, 
                    influence: 0, 
                    any: 0,
                }
            },
            2: {
                produceResource: {
                    toward: {
                        city: {
                            gold: 0, 
                            science: 0, 
                            influence: 5,
                            any: 0
                        }
                    }
                }
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/DwightDEisenhower.jpg')} />
}