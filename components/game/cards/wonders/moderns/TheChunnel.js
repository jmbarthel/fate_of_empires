import React from 'react';
import { Image } from "react-native";

export default TheChunnel = (props) => {
    const type = 'modern_wonder';
    const name = 'TheChunnel';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../../assets/wonders/moderns/TheChunnel.jpg')} />
}