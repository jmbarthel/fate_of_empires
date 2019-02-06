import React from 'react';
import { Image } from "react-native";

export default BigBen = (props) => {
    const type = 'modern_wonder';
    const name = 'BigBen';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../../assets/wonders/moderns/BigBen.jpg')} />
}