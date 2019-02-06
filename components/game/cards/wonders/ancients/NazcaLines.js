import React from 'react';
import { Image } from "react-native";

export default NazcaLines = (props) => {
    const type = 'ancient_wonder';
    const name = 'NazcaLines';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../../assets/wonders/ancients/NazcaLines.jpg')} />
}