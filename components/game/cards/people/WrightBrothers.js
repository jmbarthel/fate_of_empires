import React from 'react';
import { Image } from "react-native";

export default WrightBrothers = (props) => {
    props = {
        ...props, 
        type: 'person', 
        name: 'WrightBrothers', 
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
                    science: 4,
                    eachScienceInHand: {
                        science: 1
                    }
                }, 
            },
            2: {
                produceResource: {
                    toward: {
                        person: {
                            gold: 4
                        }
                    }
                }
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/WrightBrothers.jpg')} />
}