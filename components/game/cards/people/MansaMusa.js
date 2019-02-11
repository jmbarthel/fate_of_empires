import React from 'react';
import { Image } from "react-native";

export default MansaMusa = (props) => {
    props = {
        ...props, 
        type: 'person', 
        name: 'MansaMusa', 
        region: 'yellow',
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
                spendAsAny: 'gold'
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/MansaMusa.jpg')} />
}