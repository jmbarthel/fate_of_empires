import React from 'react';
import { Image } from "react-native";

export default Boudica = (props) => {
    props = {
        ...props, 
        type: 'person', 
        name: 'Boudica', 
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
                    gold: 0,
                    science: 0, 
                    influence: 4,
                    any: 0,
                }
            },
            2: {
                produceResource: {
                    toward: {
                        yourRegion: {
                            gold: 0, 
                            science: 0, 
                            influence: 0,
                            any: 3, 
                        }
					}
                },
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/Boudica.jpg')} />
}