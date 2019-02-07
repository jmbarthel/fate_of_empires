import React from 'react';
import { Image } from "react-native";

export default AmazonRainforest = (props) => {
    const cost = 5; const type='natural_wonder';
    const name = 'AmazonRainforest';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../../assets/wonders/natural/AmazonRainforest.jpg')} />
}