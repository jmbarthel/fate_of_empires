import React from 'react';
import { Image } from "react-native";

export default Carthage = (props) => {
    props = {
        ...props, 
        type: 'city', 
        name: 'Carthage', 
        cost: {
            gold: 5,
            influence: 0, 
            science: 0,
        },
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/cities/Carthage.jpg')} />
}