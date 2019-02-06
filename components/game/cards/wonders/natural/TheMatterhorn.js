import React from 'react';
import { Image } from "react-native";

export default TheMatterhorn = (props) => {
    const type = 'natural_wonder';
    const name = 'TheMatterhorn';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../../assets/wonders/natural/TheMatterhorn.jpg')} />
}