import React from 'react';
import { Image } from "react-native";

export default NapoleonBonaparte = (props) => {
    props = {
        ...props, 
        type: 'person', 
        name: 'NapoleonBonaparte', 
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
                    influence: 3
                },
                reduceCost: {
                    city: {
                        influence: 1
                    }
                }
            },
            2: {
                produceResource: {
                    toward: {
                        yourRegion: {
                            any: 3
                        }
                    }
                }
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/NapoleonBonaparte.jpg')} />
}