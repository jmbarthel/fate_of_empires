import React from 'react';
import { Image } from "react-native";

export default BenjaminFranklin = (props) => {
    props = {
        ...props, 
        type: 'person', 
        name: 'BenjaminFranklin', 
        region: 'blue',
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
                    influence: 0,
                    any: 2,
                }
            },
            2: {
                produceResource: {
                    toward: {
						technology: {
							gold: 0, 
							science: 4, 
							influence: 0,
							any: 0,
						}, 
					}
                },
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/BenjaminFranklin.jpg')} />
}