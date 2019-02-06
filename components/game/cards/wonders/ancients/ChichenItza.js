import React from 'react';
import { Image } from "react-native";

export default ChichenItza = (props) => {
    const type = 'ancient_wonder';
    const name = 'ChichenItza';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../../assets/wonders/ancients/ChichenItza.jpg')} />
}