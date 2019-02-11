import React from 'react';
import { Image } from "react-native";

export default HuaMulan = (props) => {
    props = {
        ...props, 
        type: 'person', 
        name: 'HuaMulan', 
        region: 'red',
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
                produceResourceCondition: {
                    inHand: {
                        city: {
                            gold: 4
                        }
                    }
                }
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/HuaMulan.jpg')} />
}