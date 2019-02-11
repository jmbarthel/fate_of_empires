import React from 'react';
import { Image } from "react-native";

export default MahatmaGandhi = (props) => {
    props = {
        ...props, 
        type: 'person', 
        name: 'MahatmaGandhi', 
        region: 'purple',
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
                produceResource: {
                    toward: {
                        person: {
                            gold: 5
                        }
                    }
                }
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/MahatmaGandhi.jpg')} />
}