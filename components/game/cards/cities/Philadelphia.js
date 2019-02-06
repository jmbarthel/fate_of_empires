import React from 'react';
import { Image } from "react-native";

export default Philadelphia = (props) => {
    const type = 'cities';
    const name = 'Philadelphia';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/cities/Philadelphia.jpg')} />
}