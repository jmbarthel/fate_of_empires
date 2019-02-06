import React from 'react';
import { Image } from "react-native";

export default TongariroNationalPark = (props) => {
    const type = 'natural_wonder';
    const name = 'TongariroNationalPark';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../../assets/wonders/natural/TongariroNationalPark.jpg')} />
}