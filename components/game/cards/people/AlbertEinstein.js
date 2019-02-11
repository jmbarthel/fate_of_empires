import React from 'react';
import { Image } from "react-native";

export default AlbertEinstein = (props) => {
    props = {
        ...props, 
        type: 'person', 
        name: 'AlbertEinstein', 
        region: 'green',
        cost: {
            gold: 12,
            influence: 0, 
            science: 0,
        },
        choiceCount: 2, 
        choices: {
            1: {
                produceResource: {
                    science: 6, 
                }
            },
            2: {
                produceResource: {
                    toward: {
						A_M_wonders: {
							science: 9, 
						}, 
					}
                },
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/AlbertEinstein.jpg')} />
}