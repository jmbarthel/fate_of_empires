import React from 'react';
import { Image } from "react-native";

export default HongKong = (props) => {
    props = {
        ...props, 
        type: 'city', 
        name: 'HongKong', 
        cost: {
            gold: 0,
            influence: 12, 
            science: 0,
        },
        choiceCount: 2, 
        choices: {
            1: {
                produceResource: {
                    influence: 5,
                }
            },
            2: {
                produceResource: {
                    workerOnCapital: {
                        any: 1
                    }
                }
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/cities/HongKong.jpg')} />
}