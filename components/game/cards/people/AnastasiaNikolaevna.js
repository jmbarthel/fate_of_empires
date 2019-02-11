import React from 'react';
import { Image } from "react-native";

export default AnastasiaNikolaevna = (props) => {
    props = {
        ...props, 
        type: 'person', 
        name: 'AnastasiaNikolaevna', 
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
                    gold: 0,
                    science: 0, 
                    influence: 4,
                    any: 0,
                }
            },
            2: {
                exile: {
                    this: {
                        produceResource: {
                            gold: 0, 
                            science: 0,
                            influence: 10, 
                        }
                    }
                }
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/AnastasiaNikolaevna.jpg')} />
}