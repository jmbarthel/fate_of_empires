import React from 'react';
import { Image } from "react-native";

export default CeremonialBurial = (props) => {
    const type = 'technology';
    const name = 'CeremonialBurial';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/technology/CeremonialBurial.jpg')} />
}