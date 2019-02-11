import React from 'react';
import { Image } from "react-native";

export default WuZetian = (props) => {
    props = {
        ...props, 
        type: 'person', 
        name: 'WuZetian', 
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
                    gold: 4
                }
            }, 
            2: {
                produceResource: {
                    toward: {
                        A_M_wonders: {
                            any: 3
                        }
                    }
                }
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/WuZetian.jpg')} />
}