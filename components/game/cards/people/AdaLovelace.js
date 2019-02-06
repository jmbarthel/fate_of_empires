import React from 'react';
import { Image } from "react-native";

export default AdaLovelace = (props) => {
    const type = 'people';
    const name = 'AdaLovelace';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/AdaLovelace.jpg')} />
}