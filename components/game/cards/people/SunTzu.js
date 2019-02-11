import React from 'react';
import { Image } from "react-native";

export default SunTzu = (props) => {
    props = {
        ...props, 
        type: 'person', 
        name: 'SunTzu', 
        region: 'red',
        cost: {
            gold: 12,
            influence: 0, 
            science: 0,
        },
        choiceCount: 2, 
        choices: {
            1: {
                produceResource: {
                    influence: 6
                }
            },
            2: {
                produceResource: {
                    toward: {
                        otherRegion: {
                            any: 4, 
                        }
                    }
                }
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/SunTzu.jpg')} />
}