import React from 'react';
import { Image } from "react-native";

export default Combustion = (props) => {
    const type = 'technology';
    const name = 'Combustion';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/technology/Combustion.jpg')} />
}