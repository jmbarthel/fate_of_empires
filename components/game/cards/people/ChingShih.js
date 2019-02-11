import React from 'react';
import { Image } from "react-native";

export default ChingShih = (props) => {
    props = {
        ...props, 
        type: 'person', 
        name: 'ChingShih', 
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
                    gold: 4,
                }
            },
            2: {
                produceResource: {
                    toward: {
                        otherRegion: {
                            any: 4, 
                        }
					}
                },
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/ChingShih.jpg')} />
}