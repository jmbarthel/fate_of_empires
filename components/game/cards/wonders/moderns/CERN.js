import React from 'react';
import { Image } from "react-native";

export default CERN = (props) => {
    const type = 'modern_wonder';
    const name = 'CERN';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../../assets/wonders/moderns/CERN.jpg')} />
}