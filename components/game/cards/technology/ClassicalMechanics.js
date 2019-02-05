import React from 'react';
import { Image } from "react-native";

export default ClassicalMechanics = (props) => {
    const type = 'technology';
    const name = 'ClassicalMechanics';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/technology/ClassicalMechanics.jpg')} />
}