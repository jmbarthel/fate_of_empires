import React from 'react';
import { Image } from "react-native";

export default London = (props) => {
    props = {
        ...props, 
        type: 'city', 
        name: 'London', 
        cost: {
            gold: 5,
            influence: 0, 
            science: 0,
        },
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/cities/London.jpg')} />
}