import React from 'react';
import { Image } from "react-native";

export default Sanitation = (props) => {
    props = {
        ...props, 
        type: 'technology', 
        name: 'Sanitation', 
        cost: {
            gold: 0,
            influence: 0, 
            science: 10,
        },
        choiceCount: 1, 
        choices: {
            1: {
                //discard or exile a card from hand or capital: 7 science
            }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/technology/Sanitation.jpg')} />
}