import React from 'react';
import { Image } from "react-native";

export default Refrigeration = (props) => {
    props = {
        ...props, 
        type: 'technology', 
        name: 'Refrigeration', 
        cost: {
            gold: 0,
            influence: 0, 
            science: 4,
        },
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/technology/Refrigeration.jpg')} />
}