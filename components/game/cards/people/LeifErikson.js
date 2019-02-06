import React from 'react';
import { Image } from "react-native";

export default LeifErikson = (props) => {
    const type = 'people';
    const name = 'LeifErikson';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/LeifErikson.jpg')} />
}