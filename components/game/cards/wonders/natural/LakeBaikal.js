import React from 'react';
import { Image } from "react-native";

export default LakeBaikal = (props) => {
    const type = 'natural_wonder';
    const name = 'LakeBaikal';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../../assets/wonders/natural/LakeBaikal.jpg')} />
}