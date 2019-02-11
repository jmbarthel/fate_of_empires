import React from 'react';
import { Image } from "react-native";

export default SrinivasaRamanujen = (props) => {
    props = {
        ...props, 
        type: 'person', 
        name: 'SrinivasaRamanujen', 
        region: 'purple',
        cost: {
            gold: 7,
            influence: 0, 
            science: 0,
        },
        choiceCount: 2, 
        choices: {
            1: {
                produceResource: {
                    science: 3
                },
                produceResourceCondition: {
                    onCapital: {
                        scientist: {
                            science: 2
                        }
                    }
                }
            },
            2: {
                // This case will need to be handled on a case by case basis
                srinivasaramanujen: true
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/SrinivasaRamanujen.jpg')} />
}