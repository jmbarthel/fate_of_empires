import React from 'react';
import { Image } from "react-native";

export default Moscow = (props) => {
    const type = 'cities';
    const name = 'Moscow';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/cities/Moscow.jpg')} />
}