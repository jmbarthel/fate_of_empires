import React from 'react';
import { Image } from "react-native";

export default Calculus = (props) => {
    const type = 'technology';
    const name = 'Calculus';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/technology/Calculus.jpg')} />
}