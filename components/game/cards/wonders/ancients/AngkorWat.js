import React from 'react';
import { Image } from "react-native";

export default AngkorWat = (props) => {
    const type = 'ancient_wonder';
    const name = 'AngkorWat';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../../assets/wonders/ancients/AngkorWat.jpg')} />
}