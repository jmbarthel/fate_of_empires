import React from 'react';
import { Image } from "react-native";

export default ElizabethCadyStanton = (props) => {
    props = {
        ...props, 
        type: 'person', 
        name: 'ElizabethCadyStanton',
        region: 'blue', 
        cost: {
            gold: 10,
            influence: 0, 
            science: 0,
        },
        choiceCount: 2, 
        choices: {
            1: {
                produceResource: {
                    toward: {
                        person: {
                            gold: 5, 
                            science: 0, 
                            influence: 0, 
                            any: 0
                        }
                    }
                }
            },
            2: {
                produceResource: {
                    eachPersonInHand: {
                        influence: 4
                    }
                }
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/ElizabethCadyStanton.jpg')} />
}