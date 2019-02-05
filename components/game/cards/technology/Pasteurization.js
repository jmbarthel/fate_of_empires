import React from 'react';
import { Image } from "react-native";

export default Pasteurization = (props) => {
    const type = 'technology';
    const name = 'Pasteurization';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/technology/Pasteurization.jpg')} />
}