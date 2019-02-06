import React from 'react';
import { Image } from "react-native";

export default GreatBarrierReef = (props) => {
    const type = 'natural_wonder';
    const name = 'GreatBarrierReef';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../../assets/wonders/natural/GreatBarrierReef.jpg')} />
}