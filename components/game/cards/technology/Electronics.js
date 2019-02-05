import React from 'react';
import { Image } from "react-native";

export default Electronics = (props) => {
    const type = 'technology';
    const name = 'Electronics';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/technology/Electronics.jpg')} />
}