import React from 'react';
import { Image } from "react-native";

export default Vienna = (props) => {
    const type = 'cities';
    const name = 'Vienna';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/cities/Vienna.jpg')} />
}