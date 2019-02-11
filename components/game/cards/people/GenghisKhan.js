import React from 'react';
import { Image } from "react-native";

export default GenghisKhan = (props) => {
    props = {
        ...props, 
        type: 'person', 
        name: 'GenghisKhan', 
        region: 'red',
        cost: {
            gold: 10,
            influence: 0, 
            science: 0,
        },
        choiceCount: 2, 
        choices: {
            1: {
                produceResource: {
                    influence: 5
                }
            },
            2: {
                exile: {
                    cards: {
                        handorcapital: {
                            get: 'worker'
                        }
                    }
                }
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/GenghisKhan.jpg')} />
}