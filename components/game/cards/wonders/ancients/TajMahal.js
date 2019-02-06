import React from 'react';
import { Image } from "react-native";

export default TajMahal = (props) => {
    const type = 'ancient_wonder';
    const name = 'TajMahal';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../../assets/wonders/ancients/TajMahal.jpg')} />
}