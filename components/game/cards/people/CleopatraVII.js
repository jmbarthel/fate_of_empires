import React from 'react';
import { Image } from "react-native";

export default CleopatraVII = (props) => {
    props = {
        ...props, 
        type: 'person', 
        name: 'CleopatraVII', 
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
                    gold: 3,
                    science: 0, 
                    influence: 0,
                    any: 0,
                },
                produceResourceCondition: {
                    inHand: {
                        person: {
                            gold: 1
                        }
                    }
                }
            },
            2: {
                exile: {
                    this: {
                        produceResource: {
                            toward: {
                                allWonders: {
                                    gold: 0, 
                                    science: 0, 
                                    influence: 10,
                                    any: 0, 
                                }
                            }
                        }
                    },
                }
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/CleopatraVII.jpg')} />
}