import React from 'react';
import { Image } from "react-native";

export default Athens = (props) => {
    const type = 'cities';
    const name = 'Athens';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/cities/Athens.jpg')} />
}