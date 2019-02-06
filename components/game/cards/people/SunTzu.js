import React from 'react';
import { Image } from "react-native";

export default SunTzu = (props) => {
    const type = 'person';
    const name = 'SunTzu';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/SunTzu.jpg')} />
}