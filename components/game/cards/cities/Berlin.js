import React from 'react';
import { Image } from "react-native";

export default Berlin = (props) => {
    const type = 'city';
    const name = 'Berlin';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/cities/Berlin.jpg')} />
}