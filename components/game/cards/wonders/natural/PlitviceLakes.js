import React from 'react';
import { Image } from "react-native";

export default PlitviceLakes = (props) => {
    const type = 'natural_wonder';
    const name = 'PlitviceLakes';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../../assets/wonders/natural/PlitviceLakes.jpg')} />
}