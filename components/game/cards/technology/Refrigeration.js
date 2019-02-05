import React from 'react';
import { Image } from "react-native";

export default Refrigeration = (props) => {
    const type = 'technology';
    const name = 'Refrigeration';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/technology/Refrigeration.jpg')} />
}