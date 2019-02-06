import React from 'react';
import { Image } from "react-native";

export default Alexandria = (props) => {
    const type = 'cities';
    const name = 'Alexandria';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/cities/Alexandria.jpg')} />
}