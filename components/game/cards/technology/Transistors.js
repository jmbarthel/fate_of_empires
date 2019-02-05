import React from 'react';
import { Image } from "react-native";

export default Transistors = (props) => {
    const type = 'technology';
    const name = 'Transistors';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/technology/Transistors.jpg')} />
}