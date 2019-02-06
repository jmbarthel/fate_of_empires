import React from 'react';
import { Image } from "react-native";

export default ChingShih = (props) => {
    const type = 'people';
    const name = 'ChingShih';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/ChingShih.jpg')} />
}