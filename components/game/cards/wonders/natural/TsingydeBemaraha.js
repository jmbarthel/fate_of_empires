import React from 'react';
import { Image } from "react-native";

export default TsingydeBemaraha = (props) => {
    const type = 'natural_wonder';
    const name = 'TsingydeBemaraha';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../../assets/wonders/natural/TsingydeBemaraha.jpg')} />
}