import React from 'react';
import { Image } from "react-native";

export default Electricity = (props) => {
    const type = 'technology';
    const name = 'Electricity';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/technology/Electricity.jpg')} />
}