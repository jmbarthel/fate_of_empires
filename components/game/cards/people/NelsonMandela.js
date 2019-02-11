import React from 'react';
import { Image } from "react-native";

export default NelsonMandela = (props) => {
    props = {
        ...props, 
        type: 'person', 
        name: 'NelsonMandela', 
        region: 'yellow',
        cost: {
            gold: 7,
            influence: 0, 
            science: 0,
        },
        choiceCount: 2, 
        choices: {
            1: {
                produceResource: {
                    influence: 4
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
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/NelsonMandela.jpg')} />
}