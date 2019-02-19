import React from 'react';
import { Image } from "react-native";

export default Astronomy = (props) => {
    props = {
        ...props, 
        type: 'technology', 
        name: 'Astronomy', 
        cost: {
            gold: 0,
            influence: 0, 
            science: 12,
        },
        choiceCount: 2, 
        choices: {
            1: {
                draw: 1
            },
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/technology/Astronomy.jpg')} />
}