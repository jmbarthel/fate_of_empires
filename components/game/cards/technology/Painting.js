import React from 'react';
import { Image } from "react-native";

export default Painting = (props) => {
    props = {
        ...props, 
        type: 'technology', 
        name: 'Painting', 
        cost: {
            gold: 0,
            influence: 0, 
            science: 4,
        },
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/technology/Painting.jpg')} />
}